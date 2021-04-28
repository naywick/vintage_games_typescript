# Tetris

## How this repo was created

```mkdir tetris

cd tetris

git init

npm init

npm install clean-webpack-plugin html-webpack-plugin style-loader ts-loader typescript webpack webpack-cli
```

Then I copied tsconfig.json and webpack.config.js from some other project, and edited as needed... ;)

I also created a .gitignore file, containing names of directories and files we definitely don't want to commit to git (node_modules, public)

## How to build

`webpack -w`

## How to run

Webpack will generate a ./public/index.html file. Open this in your browser.
