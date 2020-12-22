// let str;
// for (let i = 2; i < 13; i++) {
//     str += `
//         <th><div id="btn${i}">
//             <h2>Button1</h2>
//             <p><label>
//             <span>Sig type :</span>
//             <select class="selecttype" onchange="changeType(${i})">
//                 <option value="Note">Note</option>
//                 <option value="CC">CC</option>
//             </select>
//         </label></p>
//             <p><label>
//             <span class="sigtype">Note :</span>
//             <input type="text" size="5px" value="">
//         </label></p>
//             <p><label>
//             <span>Value :</span>
//             <input type="number" min="0" max="127" size="5px" value="127">
//         </label></p>
//         </div></th>
// `;
// }
// console.log(str);

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