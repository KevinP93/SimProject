package fr.simproject.spring.model;

import java.util.Date;

public class SimCard {

    enum Status {
        ACTIVATED,
        DESACTIVATED
    }

    private long id;
    private String iccId;
    private String msisdn;
    private String pinCode;
    private String pukCode;
    private String tag;
    private String accessPointName;
    private String ipAddress;
    private Date creationDate;

    public SimCard(){

    }
    public SimCard(long id, String iccId, String msisdn, String pinCode, String pukCode, String tag, String accessPointName, String ipAddress, Date creationDate) {
       super();
        this.id = id;
        this.iccId = iccId;
        this.msisdn = msisdn;
        this.pinCode = pinCode;
        this.pukCode = pukCode;
        this.tag = tag;
        this.accessPointName = accessPointName;
        this.ipAddress = ipAddress;
        this.creationDate = creationDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getIccId() {
        return iccId;
    }

    public void setIccId(String iccid) {
        this.iccId = iccid;
    }

    public String getMsisdn() {
        return msisdn;
    }

    public void setMsisdn(String msisdn) {
        this.msisdn = msisdn;
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }

    public String getPukCode() {
        return pukCode;
    }

    public void setPukCode(String pukCode) {
        this.pukCode = pukCode;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getAccessPointName() {
        return accessPointName;
    }

    public void setAccessPointName(String accessPointName) {
        this.accessPointName = accessPointName;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }
}
