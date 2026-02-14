const data = await fs.readFile('./data.json', 'utf8');
import fs from 'fs/promises';
import { setTimeout } from 'node:timers/promises';
let students = JSON.parse(data);
let active_students = [];
let start_times = {};
let is_saving = false;
async function logStudent(student_id) {
    if (!active_students.includes(student_id)){
     console.log(`${student_id} signed in`);
     active_students.push(student_id);
     start_times[student_id] = Date.now();
     await setTimeout(500); 
    }
    let elapsed_ms = Date.now() - start_times[student_id]
    let elapsed_time = Math.floor(elapsed_ms / 60000);

    if (elapsed_time>=1) {
        if (is_saving) return;
        is_saving = true;
        start_times[student_id] += 60000; 
        const updated_data = JSON.parse(await fs.readFile('./data.json', 'utf8'));
        const student_index = updated_data.findIndex(s => s.id === student_id);
        if (student_index !== -1)
        updated_data[student_index].time = (updated_data[student_index].time || 0) + elapsed_time;
        await fs.writeFile('./data.json', JSON.stringify(updated_data, null, 2));
        console.log(`${student_id} got one more minute`)
        is_saving = false;
    }
    
        
}
students.forEach(student => {
    let runner = setInterval(() => {
        logStudent(student.id);
    }, 1000);
});