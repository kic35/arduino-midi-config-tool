const NOTE = 144;
const CC = 176;
const BUTTON_MAX = 12;
const SOUND_NAME = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NAME_TO_NO = {
  "C-1": 0,
  "C#-1": 1,
  "D-1": 2,
  "D#-1": 3,
  "E-1": 4,
  "F-1": 5,
  "F#-1": 6,
  "G-1": 7,
  "G#-1": 8,
  "A-1": 9,
  "A#-1": 10,
  "B-1": 11,
  "C0": 12,
  "C#0": 13,
  "D0": 14,
  "D#0": 15,
  "E0": 16,
  "F0": 17,
  "F#0": 18,
  "G0": 19,
  "G#0": 20,
  "A0": 21,
  "A#0": 22,
  "B0": 23,
  "C1": 24,
  "C#1": 25,
  "D1": 26,
  "D#1": 27,
  "E1": 28,
  "F1": 29,
  "F#1": 30,
  "G1": 31,
  "G#1": 32,
  "A1": 33,
  "A#1": 34,
  "B1": 35,
  "C2": 36,
  "C#2": 37,
  "D2": 38,
  "D#2": 39,
  "E2": 40,
  "F2": 41,
  "F#2": 42,
  "G2": 43,
  "G#2": 44,
  "A2": 45,
  "A#2": 46,
  "B2": 47,
  "C3": 48,
  "C#3": 49,
  "D3": 50,
  "D#3": 51,
  "E3": 52,
  "F3": 53,
  "F#3": 54,
  "G3": 55,
  "G#3": 56,
  "A3": 57,
  "A#3": 58,
  "B3": 59,
  "C4": 60,
  "C#4": 61,
  "D4": 62,
  "D#4": 63,
  "E4": 64,
  "F4": 65,
  "F#4": 66,
  "G4": 67,
  "G#4": 68,
  "A4": 69,
  "A#4": 70,
  "B4": 71,
  "C5": 72,
  "C#5": 73,
  "D5": 74,
  "D#5": 75,
  "E5": 76,
  "F5": 77,
  "F#5": 78,
  "G5": 79,
  "G#5": 80,
  "A5": 81,
  "A#5": 82,
  "B5": 83,
  "C6": 84,
  "C#6": 85,
  "D6": 86,
  "D#6": 87,
  "E6": 88,
  "F6": 89,
  "F#6": 90,
  "G6": 91,
  "G#6": 92,
  "A6": 93,
  "A#6": 94,
  "B6": 95,
  "C7": 96,
  "C#7": 97,
  "D7": 98,
  "D#7": 99,
  "E7": 100,
  "F7": 101,
  "F#7": 102,
  "G7": 103,
  "G#7": 104,
  "A7": 105,
  "A#7": 106,
  "B7": 107,
  "C8": 108,
  "C#8": 109,
  "D8": 110,
  "D#8": 111,
  "E8": 112,
  "F8": 113,
  "F#8": 114,
  "G8": 115,
  "G#8": 116,
  "A8": 117,
  "A#8": 118,
  "B8": 119,
  "C9": 120,
  "C#9": 121,
  "D9": 122,
  "D#9": 123,
  "E9": 124,
  "F9": 125,
  "F#9": 126,
  "G9": 127
};
let buttons = [];
let globalMidiChannel = 1;

let switchModeArr = [],
  switchNoArr = [],
  switchValArr = [];

class Button {
  constructor() {
    //channel 0 : globalMIDIChannel
    this.channel = 0;
    this.mode = NOTE;
    this.number = null;
    this.velocity = 127;
  }

  get btnChannel() {
    return this.channel;
  }
  set btnChannel(val) {
    if (this.channel == 0) {
      this.channel = val;
    }
  }

  get btnMode() {
    return this.mode;
  }
  set btnMode(val) {
    if (val == "Note") {
      this.mode = NOTE;
    } else if (val == "CC") {
      this.mode = CC;
    }
  }
  get btnNo() {
    return this.number;
  }
  set btnNo(val) {
    if (isNaN(Number(val)) == true) {
      this.number = nameToNo[val];
    } else {
      this.number = Number(val);
    }
  }
  whichSelected(val) {
    if (this.mode == val) {
      return "selected";
    }
  }

  showHtml(btn) {
    this.htmlContents =
      `<div id="btn${btn}">
        <h2>Button${btn}</h2>
        <p><label>
          <span>Sig type :</span>
          <select class="selecttype">
            <option value="Note" ${this.whichSelected(NOTE)}>Note</option>
            <option value="CC" ${this.whichSelected(CC)}>CC</option>
          </select>
        </label></p>
        <p><label>
          <span class="sigtype">${this.mode} :</span>
          <input type="text" class="no" size="5px" value=${this.btnNo != null ? this.btnNo : ""}>
        </label></p>
        <p><label>
          <span>Velocity :</span>
          <input type="number" class="velocity" min="0" max="127" size="5px" value="${this.velocity}">
        </label></p>
    </div>`;
    $("#configArea").html(this.htmlContents);
    console.log(`show : btn${btn}\n${this.htmlContents}`);
  }
}

$("#selectMidiChannel").on("change", function () {
  globalMidiChannel = Number($("#selectMidiChannel option:selected").val());
  buttons.forEach(function (value) {
    value.btnChannel(globalMidiChannel);
  });
  //console.log(`Global MIDI channel is ${globalMidiChannel}.`);
});

for (let i = 0; i < BUTTON_MAX; i++) {
  buttons[i] = new Button(i);
}
buttons[0].showHtml(1);


//セーブしたときの動作
$("#save").on("click", function () {

  let blob = new Blob([inoData], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, 'setmidi.ino');
});

//Note, CCの切り替え
function changeType(no) {
  buttons[no].btnmode($(`#btn${btnNo} option:selected`).val());
  //$(`#btn${btnNo} .sigtype`).text($(`#btn${btnNo} option:selected`).val() + " :");
}

function assignValues() {
  //吐き出す.inoの元
  let inoData = `
#define NOTE_ON 144
#define NOTE_OFF 128
#define ALL_NOTE_OFF 120
#define BUTTON_MAX 12
int pin_no[] = {2,6,10,3,7,11,4,8,12,5,9,13};
int sw_state[] = {0,0,0,0,0,0,0,0,0,0,0,0};
${switchMode}
${switchNo}
${switchVal}
void setup() {
  for(int i = 0; i < BUTTON_MAX; i++){
    pinMode(pin_no[i], INPUT);
  }
  Serial.begin(31250);
  sendMidi(CC, 120, 0); //all sound off
}
void loop() {
  for(int i = 0; i < BUTTON_MAX; i++){
    int state_new = digitalRead(pin_no[i]);
    if(sw_state[i] != state_new){
      sw_state[i] = state_new;
      sendMidi(NOTE_ON, note_no[i], sw_state[i] * 127);
    }
  }
}
void sendMidi(int cmd, int pitch, int velocity) {
  Serial.write(cmd);
  Serial.write(pitch);
  Serial.write(velocity);
}`;
  $("#result").html(inoData.replace(/\r?\n/g, "<br>"));
}