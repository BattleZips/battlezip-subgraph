# battlezip-subgraph

## Background
Subgraph implementation for the BattleZips protocol

### BattleZips Repos

Subgraph: https://github.com/Ian-Bright/battlezip-subgraph  
Contracts: https://github.com/jp4g/BattleZips

### Current supported networks

* Rinkeby
* Goerli
* Mumbai
* Polygon

## Setup

1. Generate template files for supported network of choice

```
yarn precodegen:<supported_network>
---
npm precodegen:<supported_network>
```

This command will populate the subgraph.yml file with the necessary parameters

2. Generate code

```
yarn codegen
---
npm codegen
```

3. (optional) Compile

```
yarn build
--- 
npm build
```

4. Update deploy script in package.json to point to your own subgraph


5. Deploy to respective network

```
yarn deploy:<supported_network>
---
npm deploy:<supported_network>
```



