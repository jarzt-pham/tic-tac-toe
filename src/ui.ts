export module MATRIX {
  export type Matrix = string[][];

  export const EMPTY_POSITION = "-";

  export const INITIAL_MATRIX: Matrix = [
    [EMPTY_POSITION, EMPTY_POSITION, EMPTY_POSITION],
    [EMPTY_POSITION, EMPTY_POSITION, EMPTY_POSITION],
    [EMPTY_POSITION, EMPTY_POSITION, EMPTY_POSITION],
  ];

  export const show = (matrixValue: Matrix) => {
    const UI = `
   +--1--+--2--+--3--+
  1|  ${matrixValue[0][0]}  |  ${matrixValue[0][1]}  |  ${matrixValue[0][2]}  |
   +-----+-----+-----+
  2|  ${matrixValue[1][0]}  |  ${matrixValue[1][1]}  |  ${matrixValue[1][2]}  |
   +-----+-----+-----+
  3|  ${matrixValue[2][0]}  |  ${matrixValue[2][1]}  |  ${matrixValue[2][2]}  |
   +-----+-----+-----+
  `;

    console.log(UI);
  };
}

export module INTERFACE {
  type Player = {
    x: "x";
    o: "o";
  };
  export let PLAYER: {
    MAIN: keyof Player;
    ENEMY: keyof Player;
  } = {
    MAIN: "x",
    ENEMY: "o",
  };
  export const ACCEPT_INTERFACE_VALUE = Object.values(PLAYER) as string[];

  export const showDialoguePlayerInterface = async () => {
    // printSlowly("This game has 2 interfaces for you!");
    // await printSlowly(`Interface 1: ${PLAYER.MAIN}, Interface 2: ${PLAYER.ENEMY}. `);

    await INTERACT.printSlowly("This game has 2 interfaces for player!\n");
    await INTERACT.printSlowly(
      `Interface 1: ${PLAYER.MAIN}, Interface 2: ${PLAYER.ENEMY}. \n`
    );

    await selectInterface();
  };

  const selectInterface = async () => {
    const dialogueInteractSelectPlayer = INTERACT.dialogueInteract;

    await INTERACT.printSlowly(`Which one of them do you like?\nYour choice:`);
    dialogueInteractSelectPlayer.question(
      ` `,
      async (interfaceInput: string) => {
        //validate
        if (!ACCEPT_INTERFACE_VALUE.includes(interfaceInput)) {
          await INTERACT.printSlowly(
            "You chose a type of interface incorrectly!\n"
          );
          await INTERACT.printSlowly("Again...!\n");
          selectInterface(); // Call prompt again if the input is invalid
          return; // Exit the function to prevent further execution
        }

        await INTERACT.printSlowly(`You choose ${interfaceInput}!`);
        PLAYER.MAIN = interfaceInput as keyof Player;
        PLAYER.ENEMY = ACCEPT_INTERFACE_VALUE.find(
          (i) => i !== interfaceInput
        ) as keyof Player;

        console.log(`You: ${PLAYER.MAIN}\n`);
        console.log(`BOT: ${PLAYER.ENEMY}\n`);
        dialogueInteractSelectPlayer.close();
      }
    );
  };
}

export module INTERACT {
  export const dialogueInteract = require("node:readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  export const printSlowly = (message: string, speed: number = 20) => {
    return new Promise<void>((resolve) => {
      let index = 0;
      const printNextChar = () => {
        if (index < message.length) {
          process.stdout.write(message[index]);
          index++;
          setTimeout(printNextChar, speed);
        } else {
          process.stdout.write("\n");
          resolve();
        }
      };
      printNextChar();
    });
  };
}
