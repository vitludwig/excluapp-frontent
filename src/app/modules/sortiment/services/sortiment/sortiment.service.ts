import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEvent } from '@modules/event/types/IEvent';
import { IKegStatus } from '@modules/sortiment/types/IKegStatus';
import { IKegUserStatistics } from '@modules/sortiment/types/IKegUserStatistics';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IKeg } from '../../types/IKeg';
import { ISortimentFilters } from './types/ISortimentFilters';

@Injectable({
	providedIn: 'root',
})
export class SortimentService {
	private readonly http = inject(HttpClient);

	public addSortiment(value: IKeg | IKeg[]): Observable<IKeg | IKeg[]> {
		return this.http.post<IKeg>(`${environment.apiUrl}/keg`, value);
	}

	public getSortimentById(id: number): Observable<IKeg> {
		return this.http.get<IKeg>(`${environment.apiUrl}/keg/${id}`);
	}

	public getSortimentList(id?: number[], filters?: ISortimentFilters): Observable<IKeg[]> {
		let params = new HttpParams({
			fromObject: {
				ids: id ?? [],
			},
		});
		for (const [paramKey, paramValue] of Object.entries(filters ?? {})) {
			if (paramValue !== undefined) {
				params = params.append(paramKey, paramValue);
			}
		}

		// TODO: sort it on places where its needed, this should only retrieve data
		return this.http.get<IKeg[]>(`${environment.apiUrl}/keg`, { params: params }).pipe(map((kegs) => kegs.sort((a, b) => a.position - b.position)));
	}

	public updateSortiment(id: number, value: Partial<IKeg>): Observable<IKeg> {
		return this.http.patch<IKeg>(`${environment.apiUrl}/keg/${id}`, value);
	}

	public updateSortimentBulk(value: Partial<IKeg>[]): Observable<IKeg[]> {
		return this.http.patch<IKeg[]>(`${environment.apiUrl}/keg/`, value);
	}

	public removeSortiment(id: number): Observable<any> {
		return this.http.delete<IKeg>(`${environment.apiUrl}/keg/${id}`);
	}

	public addKegToEvent(eventId: number, kegIds: number[]): Observable<void> {
		return this.http.post<void>(`${environment.apiUrl}/keg/kegToEvent`, {
			eventId: eventId,
			kegIds: kegIds,
		});
	}

	public getKegEvent(kegId: number): Observable<IEvent> {
		return this.http.get<IEvent>(`${environment.apiUrl}'/keg/${kegId}/event`);
	}

	public getSources() {
		return this.http.get<string[]>(`${environment.apiUrl}/keg/sources`);
	}

	public removeKegFromEvent(eventId: number, kegIds: number[]): Observable<void> {
		return this.http.post<void>(`${environment.apiUrl}/keg/kegToEvent/${eventId}/remove`, { kegIds });
	}

	public getKegStatus(kegId: number): Observable<IKegStatus> {
		return this.http.get<IKegStatus>(`${environment.apiUrl}/keg/${kegId}/status`);
	}

	public getKegUsersStatistics(kegId: number): Observable<IKegUserStatistics[]> {
		return this.http.get<IKegUserStatistics[]>(`${environment.apiUrl}/keg/${kegId}/users-statistics`);
	}

	public getDuplicateKegs(keg: IKeg) {
		return this.http.post<IKeg[]>(`${environment.apiUrl}/keg/check-duplicate`, { name: keg.name, sourceName: keg.sourceName, volume: keg.volume });
	}
}
