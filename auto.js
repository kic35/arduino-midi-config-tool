let autoStr;
for (let i = 1; i <= 12; i++) {
    if(i%4==1){
        autoStr+=`<tr>
        `;
    }
    autoStr += `<td>
        <div id="btn${i}">
        <h2>Button${i}</h2>
        <p><label>
        <span>Sig type :</span>
        <select class="selecttype" onchange="changeType(${i})">
        <option value="Note">Note</option>
        <option value="CC">CC</option>
        </select>
        </label></p>
        <p><label>
        <span class="sigtype">Note :</span>
        <input type="text" class="no" size="5px" value="111" />
        </label></p>
        <p><label>
        <span>Velocity :</span>
        <input type="number" class="velocity" min="0" max="127" size="5px" value="127" />
        </label></p>
        </div>
        </td>`;
    if(i%4==0){
        autoStr+=`</tr>
        `;
    }
}
console.log(autoStr);

// let str = "";
// let soundName = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
// let note = 0;
// for (let i = -1; i < 10; i++) {
//     for (let j = 0; j < 12; j++) {
//         str += `"${soundName[j%12]}${i}" : ${note}, `;
//         note++;
//         if (note == 128) {
//             break;
//         }
//     }
// }
// console.log(str);