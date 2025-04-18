class EgyetemiDolgozo {
    constructor(nev, cim, fizetes) {
        this.nev = nev;
        this.cim = cim;
        this.fizetes = fizetes;
    }
    
    fizetesModosit(emeles) {
        this.fizetes += emeles;
    }
}

class Tanar extends EgyetemiDolgozo {
    constructor(nev, cim, fizetes, tanszek) {
        super(nev, cim, fizetes);
        this.tanszek = tanszek;
        this.tantargyak = [];
    }
    
    tantargy(tantargy) {
        this.tantargyak.push(tantargy);
    }
    tantargyakSzama() {
        return this.tantargyak.length;
    }
}

function frissitTabla(tbodyId, adatok) {
    const tabla = document.getElementById(tbodyId);
    tabla.innerHTML = "";

    adatok.forEach((obj) => {
        const tr = document.createElement("tr");

        const tdNev = document.createElement("td");
        tdNev.textContent = obj.nev;
        tr.appendChild(tdNev);

        const tdCim = document.createElement("td");
        tdCim.textContent = obj.cim;
        tr.appendChild(tdCim);

        const tdFizetes = document.createElement("td");
        tdFizetes.textContent = obj.fizetes;
        tr.appendChild(tdFizetes);

        const tdTanszek = document.createElement("td");
        tdTanszek.textContent = obj.tanszek || "---";
        tr.appendChild(tdTanszek);

        const tdTantargyak = document.createElement("td");
        if (obj.tantargyak) {
            tdTantargyak.textContent = obj.tantargyakSzama() + ": " + obj.tantargyak.join(", ");
        } else {
            tdTantargyak.textContent = "---";
        }
        tr.appendChild(tdTantargyak);

        tabla.appendChild(tr);
    });
}

var objects = [];
objects.push(new EgyetemiDolgozo('Kovács Melinda', 'Budapest', 250000));
objects.push(new Tanar('Kovács Izabella', 'Kecskemét', 300000, 'Informatika'));
objects.push(new Tanar('Szabó Péter', 'Szeged', 275000, 'Gépész'));

window.onload = function() {
    frissitTabla("oojsKezdoTabla", objects);

    objects[0].fizetesModosit(50000);
    objects[2].fizetesModosit(25000);
    objects[1].tantargy("Programozás I");
    objects[1].tantargy("Programozás II");
    objects[1].tantargy("Vizuális programozás");
    objects[2].tantargy("Web-programozás I");
    objects[2].tantargy("Web-programozás II");

    frissitTabla("oojsModositottTabla", objects);
};
