package fr.simproject.spring.model;



import java.util.Date;
import javax.persistence.*;

@Entity
@Table(name = "simcards")
public class SimCard {

    public SimCard() {
        // Constructeur par défaut sans arguments
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ICCID")
    private Long iccId;
    @Column(name = "MSISDN")
    private String msisdn;
    @Column(name = "PINCode")
    private String pinCode;
    @Column(name = "PUKCode")
    private String pukCode;
    @Column(name = "Tag")
    private String tag;

    private String accessPointName;
    @Column(name = "IPAddr")
    private String ipAddress;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status")
    private Status status;

    private Date creationDate;



    public enum Status {
        ACTIVATED,
        DEACTIVATED
    }

    // Constructeur avec des paramètres
    public SimCard(String iccId, String msisdn, String pinCode, String pukCode, String tag, String accessPointName, String ipAddress, Date creationDate) {
        this.iccId = Long.valueOf(iccId);
        this.msisdn = msisdn;
        this.pinCode = pinCode;
        this.pukCode = pukCode;
        this.tag = tag;
        this.accessPointName = accessPointName;
        this.ipAddress = ipAddress;
        this.creationDate = creationDate;
    }

    public Long getIccId() {
        return iccId;
    }

    public void setIccId(Long iccid) {
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
