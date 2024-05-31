#!/usr/bin/env node

const readline = require('readline');
const { exec } = require('child_process');

const buildTargets = [
  'my_first_three_project_with_nuxt',
  'react_next_practice',
  'redux_saga-nextjs-app',
  'trying_express-zod-api_with-socket-chat',
  'ts_pratice_script',
];

const runTargets = buildTargets.map(target => `run_${target}`);

const actions = [
  'Build a docker image',
  'Run a running image with a container',
  'Clean up Docker containers and images'
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  });
  
  function executeCommand(command, callback) {
    const process = exec(command);
  
    process.stdout.on('data', (data) => {
      console.log(data.toString());
    });
  
    process.stderr.on('data', (data) => {
      console.error(data.toString());
    });
  
    process.on('close', (code) => {
      console.log(`Command finished with exit code ${code}`);
      callback();
    });
  }
  
  function showMenu(options, callback) {
    let index = 0;
  
    const renderMenu = () => {
      console.clear();
      options.forEach((option, i) => {
        if (i === index) {
          console.log(`> ${option}`);
        } else {
          console.log(`  ${option}`);
        }
      });
    };
  
    const onKeyPress = (str, key) => {
      if (key.name === 'up' && index > 0) {
        index--;
      } else if (key.name === 'down' && index < options.length - 1) {
        index++;
      } else if (key.name === 'return') {
        rl.input.removeListener('keypress', onKeyPress);
        callback(index);
        return;
      }
      renderMenu();
    };
  
    rl.input.setRawMode(true);
    rl.input.resume();
    rl.input.on('keypress', onKeyPress);
  
    renderMenu();
  }
  
  function mainMenu() {
    showMenu(actions, async (actionIndex) => {
      switch (actions[actionIndex]) {
        case actions[0]:
          showMenu(buildTargets, (buildIndex) => {
            executeCommand(`make build_${buildTargets[buildIndex]}`, mainMenu);
          });
          break;
        case actions[1]:
          showMenu(runTargets, (runIndex) => {
            executeCommand(`make ${runTargets[runIndex]}`, mainMenu);
          });
          break;
        case actions[2]:
          executeCommand('make clean', mainMenu);
          break;
        default:
          console.log('Invalid choice');
          mainMenu();
      }
    });
  }
  
  mainMenu();