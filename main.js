const textElement = document.getElementById('cmdOptionText')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.cmdOptionText

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.cmdOptionText
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {

    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}


const textNodes = [{
        id: 1,
        cmdOptionText: `-You are Standing outside a large company building

                        -You look to your left and there is a group of people smoking

                        -There could be more information at the other side of the building`,

        options: [{
                cmdOptionText: 'Walk around the building to investigate',
                setState: {
                    dumpsterCheck: true,
                    smokerCheck: true,
                    coridoorCheck: true,
                    paper: false,
                    key: false,
                    id: false
                },
                nextText: 2
            },
            {
                cmdOptionText: 'Walk up to the people',
                setState: {
                    dumpsterCheck: true,
                    smokerCheck: false,
                    coridoorCheck: true,
                    paper:false,
                    key:false,
                    idCard:false
                },
                nextText: 15
            }
        ]
    },

    {
        id: 2,
        cmdOptionText: `- You have walked around the building...

                        - You see lots of dumpsters

                        - The Back entrance to the company building has been leftopen `,
        options: [{
                cmdOptionText: 'Look through the dumpsters',
                requiredState: (currentState) => currentState.dumpsterCheck,
                nextText: 3
            },
            {
                cmdOptionText: 'Sneak in through the back door',
                nextText: 4
            },

        ]
    },

    {
        id: 3,
        cmdOptionText: `- You dig through the trash in the dumpster...

                        - There is a jacket throwen away

                        - Checks jacket pockets and finds a key `,
        options: [{

              cmdOptionText: 'Walk back around to the front of the building',
              setState: {
                  key: true,
                  dumpsterCheck: false
            },
              nextText: 8
            },
            {
              cmdOptionText: 'Go through the back door',
              setState: {
                  key: true,
                  dumpsterCheck: false
            },
              nextText: 4
            }
        ]
    },
    {
      id: 4,
      cmdOptionText: `- You have walked through the open door...

                      - You are presented with a coridoor with rooms at the end

                      - You look to your left and there is a closed door`,
      options: [{
              cmdOptionText: 'Check if the door is open',
              nextText: 5
          },
          {
              cmdOptionText: 'Continue down the corridoor',
              nextText: 20
          }
      ]
  },
  {
        id: 5,
        cmdOptionText: `- The door is locked...`,
        options: [{
            cmdOptionText: 'Continue Down the corridoor',
            nextText: 20
        },

        {
          cmdOptionText: 'Attempt to use key on door',
          requiredState: (currentState) => currentState.key,
          nextText: 11
        },

        {
          cmdOptionText: 'Walk back outside',
          nextText: 7
        }
      ]
    },
    {
        id: 7,
        cmdOptionText: `- You have walked back outside...`,
        options: [{
            cmdOptionText: 'check dumster',
            requiredState: (currentState) => currentState.dumpsterCheck,
            nextText: 3
        },

        {
          cmdOptionText: 'Walk back around to the front of the building',
          nextText: 8
        },


      ]
    },
    {
        id: 8,
        cmdOptionText: `- You have walked back around to the front of the building...

                        - The same employees are still outside smoking`,
        options: [{
                cmdOptionText: 'Walk up and talk to the people',
                requiredState: (currentState) => currentState.smokerCheck,
                nextText: 15
            },
            {
                cmdOptionText: 'Go back around to the other side of the building',
                nextText: 2
            },
        ]
    },
    {
        id: 9,
        cmdOptionText: `- You have walked around the building...

                        - You see lots of dumpsters

                        - The Back entrance to the company building has been leftopen `,
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 10,
        cmdOptionText: `- You have walked around the building...

                        - You see lots of dumpsters

                        - The Back entrance to the company building has been leftopen `,
        options: [{
            text: 'Restart',
            nextText: -1
        }]
    },
    {
        id: 11,
        cmdOptionText: `- You have unlocked the door and walked through...

                        - There is an empty office with a table and a computer

                        - You see on the table there is a sheet of paper `,
        options: [{
            cmdOptionText: 'Pickup sheet of paper',
            setState: {
                paper: true,
            },
            nextText: 12
        }]
    },

    {
        id: 12,
        cmdOptionText: `- You have picked up the sheet of paper...

                        - It appears to be a staff sign-in register

                        - The computer is password protected

                        - There is nothing else of importance in the room`,
        options: [{
            cmdOptionText: 'Leave the room',
            nextText: 13
        },

        {
            cmdOptionText: 'Complete TASK - Hand in gatherd Information',
            requiredState: (currentState) => currentState.idCard,
            nextText: 21
        },


      ]
    },

    {
        id: 13,
        cmdOptionText: `- You have walked out the room... `,
        options: [{
            cmdOptionText: 'Walk Down the coridoor',
            requiredState: (currentState) => currentState.coridoorCheck,
            nextText: 20
        },
        {
            cmdOptionText: 'Walk back outside',
            nextText: 14
        },


      ]
    },

    {
        id: 14,
        cmdOptionText: 'You have walked back outside...',
        options: [{
            cmdOptionText: 'Walk back around to the front of the building',
            nextText: 8
        }]
    },

    {
        id: 15,
        cmdOptionText: `- You have walked up to the employees smoking...

                        - You notice that one of the employees has dropped there ID card on the floor

                        - They seem to be distracted `,
        options: [{
            cmdOptionText: 'Stand on the ID and wait',
            nextText: 16
        }]
    },

    {
        id: 16,
        cmdOptionText: `- 10 minutes later...

                        - The employees leave the area and walk back to the building

                        - They are now out of sight `,
        options: [{
            cmdOptionText: 'Pick up the ID card',
            setState: {
                idCard: true,
            },
            nextText: 17
        },

      ]
    },

    {
        id: 17,
        cmdOptionText: `- There is nothing else left to investigate at the front of the building `,
        options: [{
            cmdOptionText: 'Walk to the back of the building',
            nextText: 2
        },

        {
            cmdOptionText: 'TASK COMPLETE - Hand in gathered information',
            requiredState: (currentState) => currentState.paper,
            nextText: 21
        },
      ]
    },

    {
        id: 20,
        cmdOptionText: ` | TASK FAILED |

                        - You continue down the coridoor...

                        - A security guard walks around the corner and spots you!

                        - YOU HAVE BEEN CAUGHT! KEEP TO RECONISSANCE! `,
        options: [{
            cmdOptionText: 'Play Again',
            nextText: 1
        }]
      },

        {
            id: 21,
            cmdOptionText: ` | TASK COMPLETED |

                            - Congratulations you have gather all the sensitive information... `,
            options: [{
                cmdOptionText: 'Play Again',
                nextText: 1
            }]
    }

]


startGame()
