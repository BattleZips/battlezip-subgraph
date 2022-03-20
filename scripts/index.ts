import path from 'path';
import fs from 'fs';
import glob from 'glob';
import handlebars from 'handlebars';
import goerli from './deployments/goerli-deployment.json';
import local from './deployments/local-deployment.json';
import mumbai from './deployments/mumbai-deployment.json';
import polygon from './deployments/polygon-deployment.json';
import rinkeby from './deployments/rinkeby-deployment.json';
import yargs from 'yargs';

interface BattleshipDeployment {
  networkName: string;
  startBlock: number;

  // Contracts
  battleshipGame: string;
}

const deployment = (network: string): BattleshipDeployment => {
  switch (network) {
    case 'local': {
      return {
        networkName: local.networkName,
        startBlock: local.startBlock,

        // Contracts
        battleshipGame: local.battleshipGame,
      };
    }
    case 'rinkeby': {
      return {
        networkName: rinkeby.networkName,
        startBlock: rinkeby.startBlock,

        // Contracts
        battleshipGame: rinkeby.battleshipGame,
      };
    }
    case 'goerli': {
      return {
        networkName: goerli.networkName,
        startBlock: goerli.startBlock,

        // Contracts
        battleshipGame: goerli.battleshipGame,
      };
    }
    case 'mumbai': {
      return {
        networkName: mumbai.networkName,
        startBlock: mumbai.startBlock,

        // Contracts
        battleshipGame: mumbai.battleshipGame,
      };
    }
    case 'polygon': {
      return {
        networkName: polygon.networkName,
        startBlock: polygon.startBlock,

        // Contracts
        battleshipGame: polygon.battleshipGame,
      };
    }
  }
  throw new Error('Unsupported network');
};

yargs
  .command('flatten', 'Flatten the generated code.', () => {
    const generated = path.resolve(__dirname, '..', 'src', 'generated');
    const globbed = glob.sync('**/*', { cwd: path.join(generated), absolute: true });
    const files = globbed.filter(item => {
      const stats = fs.statSync(item);
      return stats.isFile();
    });

    const directories = globbed.filter(item => {
      const stats = fs.statSync(item);
      return stats.isDirectory();
    });

    files.forEach(item => {
      const to = path.join(generated, path.basename(item));
      fs.renameSync(item, to);
    });

    directories.forEach(item => {
      fs.rmSync(item, { recursive: true, force: true });
    });
  })
  .command(
    'template',
    'Creating files from templates, populated via deployment addresses',
    yargs => {
      return yargs.option('network', {
        type: 'string',
        default: 'rinkeby',
      });
    },
    async args => {
      const deploymentInfo = deployment(args.network);
      {
        console.log('GENERATING SUBGRAPH MANIFEST');
        const template = path.join(__dirname, '../templates/subgraph.yml');
        const outputFile = path.join(__dirname, '../subgraph.yaml');
        const content = fs.readFileSync(template, 'utf8');

        const compile = handlebars.compile(content);
        const replaced = compile(deploymentInfo);

        fs.writeFileSync(outputFile, replaced);
      }
    },
  )
  .help().argv;
