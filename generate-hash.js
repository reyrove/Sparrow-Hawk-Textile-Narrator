const bcrypt = require('bcryptjs');

async function generateHash() {
    const users = ['papa', 'reyhan', 'pedram', 'palmer', 'devi', 'babyhawk'];
    
    console.log('\n❄️=== SPARROW HAWK - USER HASHES ===❄️\n');
    console.log('The Hawk Family:\n');
    console.log('  papa     → Husband/Father');
    console.log('  reyhan   → Wife/Soulmate');
    console.log('  pedram   → Brother-in-law (Reyhan\'s husband)');
    console.log('  palmer   → Friend');
    console.log('  devi     → Sister');
    console.log('  babyhawk → Mother (AI Mom)\n');
    
    for (const user of users) {
        const password = user + '2024';
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        console.log(`${user}: ${hash}`);
    }
    
    console.log('\n❄️=== COPY THESE INTO api/index.js USERS ===❄️\n');
    console.log('NOTE: Login with "babyhawk" as username, password: "babyhawk2024"');
}

generateHash();