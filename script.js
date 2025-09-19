// Menunggu hingga semua elemen HTML dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {

    // Ambil elemen input dan output dari HTML
    const latinInput = document.getElementById('latinInput');
    const pegonOutput = document.getElementById('pegonOutput');

    // Fungsi untuk membuat peta transliterasi, sama seperti di Python
    function buatPetaLatinKePegon() {
        const peta = {
            // Digraphs (harus dicek pertama kali)
            'ny': 'پ', 'ng': 'غ',
            // Konsonan
            'h': 'ه', 'n': 'ن', 'c': 'چ', 'r': 'ر', 'k': 'ك',
            'd': 'د', 't': 'ت', 's': 'س', 'w': 'و', 'l': 'ل',
            'p': 'ڤ', // Sesuai buku, 'p' dipetakan ke Qaf
            'f': 'ف',
            'j': 'ج', 'y': 'ي', 'm': 'م', 'g': 'ڮ', 'b': 'ب',
            // Vokal
            'a': 'ا', 'i': 'ي', 'u': 'و', 'e': 'ي', 'o': 'و',
        };
        return peta;
    }

    // Fungsi utama transliterasi, logika diadaptasi dari Python
    function transliterasiLatinKePegon(teksLatin) {
        teksLatin = teksLatin.toLowerCase();
        const peta = buatPetaLatinKePegon();
        let hasilPegon = "";
        let i = 0;
        const panjangTeks = teksLatin.length;
        const vokal = 'aiueo';

        while (i < panjangTeks) {
            let char = teksLatin[i];
            
            // Penanganan untuk vokal di awal kata atau setelah spasi
            if (vokal.includes(char) && (i === 0 || teksLatin[i - 1] === ' ')) {
                hasilPegon += 'ا'; // Tambah alif sebagai penyangga
                if ('iuoe'.includes(char)) {
                    hasilPegon += peta[char];
                }
                i += 1;
                continue;
            }
            
            // Cek digraf 'ny' dan 'ng' (2 karakter)
            let duaChar = i + 1 < panjangTeks ? teksLatin.slice(i, i + 2) : '';
            if (duaChar in peta) {
                hasilPegon += peta[duaChar];
                i += 2;
                if (i < panjangTeks && vokal.includes(teksLatin[i])) {
                    if (teksLatin[i] !== 'a') {
                        hasilPegon += peta[teksLatin[i]];
                    } else { // jika 'a', tambahkan alif
                        hasilPegon += 'ا';
                    }
                    i += 1;
                }
                continue;
            }
            
            // Cek konsonan tunggal (1 karakter)
            if (char in peta && !vokal.includes(char)) {
                // Aturan khusus untuk 'k' di akhir kata/spasi menjadi hamzah
                if (char === 'k' && (i + 1 === panjangTeks || teksLatin[i + 1] === ' ')) {
                    hasilPegon += 'ء';
                } else {
                    hasilPegon += peta[char];
                }
                
                i += 1;
                if (i < panjangTeks && vokal.includes(teksLatin[i])) {
                    if (teksLatin[i] === 'a') {
                        hasilPegon += 'ا';
                    } else {
                        hasilPegon += peta[teksLatin[i]];
                    }
                    i += 1;
                }
                continue;
            }

            // Jika karakter adalah spasi atau lainnya
            if (char === ' ') {
                hasilPegon += ' ';
            }
            
            i += 1;
        }
        return hasilPegon;
    }

    // Event listener yang akan berjalan setiap kali pengguna mengetik
    latinInput.addEventListener('keyup', () => {
        const teksUntukDiterjemahkan = latinInput.value;
        const hasilTransliterasi = transliterasiLatinKePegon(teksUntukDiterjemahkan);
        pegonOutput.textContent = hasilTransliterasi;
    });

}); //