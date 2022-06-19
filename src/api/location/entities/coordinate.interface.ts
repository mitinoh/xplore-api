export class CoordinateFilter {
    latitude: number = 0;
    longitude: number = 0
    distance: number = 0

    constructor(lat: number, lng: number, dis: number) {
        this.latitude = lat;
        this.longitude = lng;
        this.distance = dis
    }
}