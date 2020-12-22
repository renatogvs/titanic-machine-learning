import IPerson from '../interfaces/iperson'

export class Person implements IPerson {
    id: number
    name: string
    survived: boolean
    pclass: number
    sex: string
    age: number
    sibSp: number
    parch: number
    ticket: string
    fare: number
    cabin: string
    embarked: string

    constructor(props: IPerson) {
        this.id = props.id
        this.name = props.name
        this.survived = props.survived
        this.pclass = props.pclass
        this.sex = props.sex
        this.age = props.age
        this.sibSp = props.sibSp
        this.parch = props.parch
        this.ticket = props.ticket
        this.fare = props.fare
        this.cabin = props.cabin
        this.embarked = props.embarked

    }

};