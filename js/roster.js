/* Caliphs in chronological order: [number, id, English name, Urdu name, khilafat period] */
const ROSTER=[
[
1,
"abubakr",
"Hazrat Abu Bakr as-Siddiq (RA)",
"حضرت ابوبکر صدیق رضی اللہ عنہ",
"11–13 AH / 632–634 CE"
],
[
2,
"umar",
"Hazrat Umar al-Faruq (RA)",
"حضرت عمر فاروق رضی اللہ عنہ",
"13–23 AH / 634–644 CE"
],
[
3,
"uthman",
"Hazrat Uthman ibn Affan (RA)",
"حضرت عثمان بن عفان رضی اللہ عنہ",
"23–35 AH / 644–656 CE"
],
[
4,
"ali",
"Hazrat Ali ibn Abi Talib (RA)",
"حضرت علی بن ابی طالب رضی اللہ عنہ",
"35–40 AH / 656–661 CE"
],
[
5,
"hasan",
"Hazrat Hasan ibn Ali (RA)",
"حضرت حسن بن علی رضی اللہ عنہما",
"40–41 AH / 661 CE"
]
];
const ALL=ROSTER.map(r=>SULTANS.find(s=>s.n===r[0])||{id:r[1],n:r[0],name:{en:r[2],ur:r[3]},reign:r[4],born:"-",died:"-",epithet:{en:"",ur:""},type:{en:"",ur:""},stub:true,sections:[]});
