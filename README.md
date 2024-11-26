## PROJET DE GROUPE SAE 501

Application et service web intégrant les bonnes pratiques en matière de genie logiciel, devOps && sécurité.

## MENBRE DU GROUPE

NICAUD Rosalie
MOTENGO BAUTI Ornella
ELENGA Dan

## STRUCTURE DU PROJET

code/
├── database/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── styles/
│   └── uploads/
├── server/
│   ├── api-router/
│   ├── back-end-router/
│   ├── front-end-router.js
│   ├── debug-router.js
│   ├── index.js
│   └── uploader.js
└── src/
    ├── components/
    │   ├── front-end/
    │   └── back-end/
    ├── data/
    │   └── menu.json
    ├── layouts/
    │   ├── front-end/
    │   └── back-end/
    ├── pages/
    ├── scripts/
    │   ├── main.backend.js
    │   └── main.frontend.js
    └── styles/
```

## MISE EN PLACE
1.Cloner le projet depuis votre éditeur de code
git clone https://github.com/dancodeur/SAE-501.git

2.Installer MongoDB depuis le site officiel
https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-8.0.3-signed.msi

## CONFIGURATION

Dans le dossier env, copier puis renomer le fichier .env.dev.dist par .env.dev.local 

## INSTALLATION DES DEPENDANCES
npm install

## UTILISATION MODE DEVELOPPEMENT
npm start

## UTILISATION MODE PRODUCTION
1.Compiler les assetes géres par vite
npm build

2.Lancer le serveur de production
npm prod

