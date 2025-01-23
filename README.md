# SimProject

**SimProject** est une application web permettant de gérer les données des cartes SIM téléphoniques à travers une interface conviviale. Ce projet est construit en utilisant **Spring Boot** pour le backend, **Angular** pour le frontend, et une base de données **MySQL** pour stocker les informations.

## 🛠️ Fonctionnalités

- **Gestion des données de cartes SIM** :
  - Ajout de nouvelles cartes SIM.
  - Suppression de cartes SIM existantes.
  - Modification des informations des cartes SIM.
- **Affichage dynamique** : Les données des cartes SIM sont affichées dans une interface web claire et interactive.
- **CRUD complet** : Fournit toutes les opérations de base sur les données.

## 📋 Pré-requis

Pour exécuter ce projet, vous aurez besoin de :

- **Java** (JDK 17 ou supérieur).
- **Node.js** et **npm** pour Angular.
- **MySQL** pour la base de données.
- Un IDE (recommandé : IntelliJ IDEA pour le backend, Visual Studio Code pour le frontend).

## ⚙️ Installation

### Backend (Spring Boot)

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/simproject.git
   cd simproject/backend
   ```

2. Configurez la base de données MySQL :
   - Créez une base de données MySQL nommée `simproject`.
   - Mettez à jour les informations de connexion dans le fichier `application.properties` :
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/simproject
     spring.datasource.username=VotreUtilisateur
     spring.datasource.password=VotreMotDePasse
     ```

3. Lancez le backend :
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend (Angular)

1. Accédez au dossier du frontend :
   ```bash
   cd simproject/frontend
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez l'application Angular :
   ```bash
   ng serve
   ```

4. Accédez à l'application :
   - Ouvrez un navigateur et rendez-vous sur [http://localhost:4200](http://localhost:4200).

## 🖥️ Fonctionnement

1. **Interface utilisateur** :
   - Les données des cartes SIM sont affichées sous forme de tableau interactif.
   - Les boutons permettent d'ajouter, modifier ou supprimer des cartes SIM directement depuis l'interface.

2. **Backend** :
   - Les appels API REST gèrent les actions sur la base de données MySQL (ajout, suppression, mise à jour et récupération des données).

3. **Base de données** :
   - Les informations des cartes SIM sont stockées avec des champs tels que : numéro de carte, opérateur, statut, etc.

## 📄 Structure du projet

```
SimProject/
  |-- backend/          # Code source du backend (Spring Boot)
  |-- frontend/         # Code source du frontend (Angular)
```

## 🌟 Points forts

- **Technologies modernes** : Utilisation de Spring Boot et Angular pour une architecture robuste et performante.
- **Interface utilisateur intuitive** : Une gestion simplifiée des cartes SIM.
- **Extensible** : Facilement adaptable pour ajouter de nouvelles fonctionnalités.

## 🚀 Prochaines évolutions

- Intégration de filtres avancés pour rechercher des cartes SIM par opérateur ou statut.
- Ajout de graphiques pour visualiser les données des cartes SIM.
- Mise en place d'une authentification utilisateur pour sécuriser l'accès.

## 📧 Contact

Si vous avez des questions ou des suggestions, n’hésitez pas à me contacter :
- **Email** : c.kevinpereira@gmail.com
- **GitHub** : https://github.com/KevinP93
