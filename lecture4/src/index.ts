/*
1) Создать TS приложение
2) Создать Интерфейс программист с полями Имя строка и язык: тип(строка)
3) Наследовать от него класс программист
4) Добавить метод представится, который возращает строку с именем и языком программирования
5) Добавить дженерик метод обработать данные, который принимает дженерик тип и возвращает строку содержащую параметр, который прислали
*/

interface IData {
    name: string;
}

interface IDeveloper {
    name: string;
    programmingLanguage: string;

    greet(): string;
}

class BigData implements IData {
    name: string = "BigData";
}

class MLData implements IData {
    name: string = "MLData";
}

class Developer implements IDeveloper {
    name: string;
    programmingLanguage: string;
    
    constructor(name: string, programmingLanguage: string){
        this.name = name;
        this.programmingLanguage = programmingLanguage;
    }

    greet() {
        return `Hello, my name is ${this.name}, i can develop using ${this.programmingLanguage}`;
    }

    processData(data: IData) {
        return `Here is processed data: ${data.name}`
    }
}

let pythonDev = new Developer("Andrii", "Python");
console.log(pythonDev.processData(BigData));
console.log(pythonDev.processData(MLData));