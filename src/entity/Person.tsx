import React from 'react'

import IPerson from '../interfaces/iperson'

export class Person implements IPerson {
    id: number
    name: string

    constructor(props: IPerson) {
        this.id = props.id
        this.name = props.name
    }

};