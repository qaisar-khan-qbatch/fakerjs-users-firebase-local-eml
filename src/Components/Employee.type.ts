export interface IEmployee {
    id: string,
    name: string,
    username: string,
    phone: string,
    email: string,
    company: string,
    address: string,
    locaiton: string,
    catchPhrase: string
    website:string
}

export interface GeoLoc {
    address:any,
    lat:number,
    lng:number
}