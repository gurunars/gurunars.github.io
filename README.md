# psd-2-project
PSD-2 project

## frontend dev

    sudo npm install yarn
    cd frontend
    yarn install
    yarn start

[React libraries](https://github.com/brillout/awesome-react-components)

## components dev

### Initialize

    cd components
    yarn install
    yarn start

### Create new component

    yarn plop MyComponentName

### Run tests (via jest)

    yarn test

## backend dev

    sudo pip install virtualenv
    mkdir ~/venvs
    virtualenv -p python3 ~/venvs/psd-2-backend/
    ~/venvs/psd-2-backend/bin/pip install -r requirements.txt
    cd backend
    ~/venvs/psd-2-backend/bin/python app.py