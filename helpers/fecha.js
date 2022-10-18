const formatoFecha = async (fecha) => {

    try {
        let date = new Date();
        //funcion que trae la hora segun uso horario local, pero trae la fecha no aceptada por mongo dia-mes-annio
        const formatFullDate = date.toLocaleDateString("es-CL", {
            year: "numeric", // se configura el formato deseado
            month: "2-digit", 
            day: "2-digit", 
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        //se obtiene formato de mes y annio que acepta mongo
        //2022-12-10:00.00.00
        let date2 = new Date(fecha);
        let year = date2.getFullYear();
        let month = date2.getMonth() + 1;
        //se reemplaza la , con : que separa fecha con horas
        //10-12-2022, 00.00.00
        date = formatFullDate.replace(', ',':')
        //10-12-2022: 00.00.00
        //se obtiene la posicion de los :
        let index = formatFullDate.indexOf(':')
        //10-12-2022: 00.00.00 = index 11
        //se corta el string para obtener las horas
        let horas = formatFullDate.slice(index - 4, formatFullDate.length)
        //10-: 00.00.00
        //se vuelve a reemplazar la , y se quitan espacios
        horas = horas.replace(',', ':');
        horas = horas.replace(' ', '');
        //obtenemos el dia 
        let day = formatFullDate.slice(0,2)
    
        return `${year}-${month}-${day}${horas}`
    } catch (error) {
        return -1
    }
}
const calcularHoras = async (fechaIngreso, fechaSalida) => {

    try {
        var diff =Math.abs(new Date(fechaIngreso)- new Date(fechaSalida));
        console.log((diff/1000)/60);
        let minutos = ((diff/1000)/60)
        let hora = 0
        let resto = 0
        while (minutos>0) {
            if (minutos>=60) {
                minutos = minutos - 60
                hora = 1
                resto = minutos
            }
        }
        let horaString = ""
        let restoString = ""
        if (hora < 10) {
            horaString = `0${hora}`
        }else{
            horaString = hora
        }
        if (resto < 10) {
            restoString = `${resto}0`
        }else{
            restoString = resto
        }
        return(`${horaString}:${restoString}`);
    } catch (error) {
        return -1
    }
}
module.exports = { 
    formatoFecha,
    calcularHoras
};