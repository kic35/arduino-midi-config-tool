let switchMode = "int switch_mode[] = {",
    switchNo = "int switch_no[] = {",
    switchVal = "int switch_val[] ={";
let switchModeArr =[],
    switchNoArr = [],
    switchValArr = [];

//吐き出す.inoの元
let inoData =
`#define NOTE_ON 144\n
#define NOTE_OFF 128\n
#define CC 176\n
#define ALL_NOTE_OFF 120\n
#define BUTTON_MAX 12\n
int pin_no[] = {2,3,4,5,6,7,8,9,10,11,12,13};\n
int sw_state[] = {0,0,0,0,0,0,0,0,0,0,0,0};" +\n
${switchMode}\n
${switchNo}\n
${switchVal}\n
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
sendMidi(NOTE_ON, note_no_1[i], sw_state[i] * 127);
}
}
}
void sendMidi(int cmd, int pitch, int velocity) {
Serial.write(cmd);
Serial.write(pitch);
Serial.write(velocity);
}
`;
//let soundName = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
//音名をMIDIノートに変換用の連想配列
let nameToNo = {
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

//Note, CCの切り替え
function changeType(btnNo) {
  $(`#btn${btnNo} .sigtype`).text($(`#btn${btnNo} option:selected`).val() + " :");
}

function convertValues(){
  for (let i = 0; i < 4; i++) {
    //Note or CC
    //noteon:144, CC : 176
    let modeVal = $(`#btn${i+1} option:selected`).val();
    if(modeVal == "Note"){
      switchModeArr[i] = 144;
    }else if(modeVal == "CC"){
      switchModeArr[i] = 176;
    }
    //convert name to no
    let noVal = $(`#btn${i+1} .no`).val();
    if (isNaN(Number(noVal)) == true) {
      switchNoArr[i] = nameToNo[noVal];
      //直でいじるバージョン
      /*
      今度書く
      */
    }else{
      switchNoArr[i] = Number(noVal);
    }
    //getvelocityval
    let velocityVal = Number($(`#btn${i+1} .velocity`).val());
    switchValArr[i] = velocityVal;
  }

  switchMode = switchMode + switchModeArr.join() + "}";
  switchNo = switchNo + switchNoArr.join() + "}";
  switchVal = switchVal + switchValArr.join() + "}";
  $("#result").html(`
    switchMode : ${switchMode}<br>
    switchNo : ${switchNo}<br>
    switchVal : ${switchVal}<br><br><br>
    ${inoData}
  `);

}

//セーブしたときの動作
$("#save").on("click", function () {
  convertValues();

  // var blob = new Blob([inoData], {
  //   type: "text/plain;charset=utf-8"
  // });
  // saveAs(blob, 'setmidi.ino');
});

presetArr=[
  ["Note", "111", 127],
  ["Note", "C2", 50],
  ["Note", "D-1", 0],
  ["CC", "1", 127]
];
for (let i = 0; i < 4; i++) {
  $(`#btn${i+1} option:selected`).val(presetArr[i][0]);
  $(`#btn${i+1} .no`).val(presetArr[i][1]);
  $(`#btn${i+1} .velocity`).val(presetArr[i][2]);
}
