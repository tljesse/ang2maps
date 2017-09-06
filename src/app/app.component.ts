import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Angular 2 Google Maps Autocomplete';
	public latitude: number;
	public longitude: number;
	public searchControl: FormControl;
	public zoom: number;

	@ViewChild('search')
	public searchElementRef: ElementRef;

	constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone){

	}

	ngOnInit() {
		// google maps defaults
		this.zoom = 4;
		this.latitude = 39;
		this.longitude = -98;

		this.searchControl = new FormControl;

		//this.setCurrentPosition();

		this.mapsAPILoader.load().then(() => {
			let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, { types: ['address'] });

			autocomplete.addListener('place_changed', () => {
				this.ngZone.run(() => {
					let place: google.maps.places.PlaceResult = autocomplete.getPlace();

					// verify
					if (place.geometry === undefined || place.geometry === null) {
						return;
					}

					// set location and zoom
					this.latitude = place.geometry.location.lat();
					this.longitude = place.geometry.location.lng();
					this.zoom = 12;
				});
			});
		});
	}

	setCurrentPosition() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((pos) => {
				this.latitude = pos.coords.latitude;
				this.longitude = pos.coords.longitude;
				this.zoom = 12;
			})
		}
	}
} // class AppComponent
