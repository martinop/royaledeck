import { GlobalVars } from './globals.service';
import { API } from './API.service';
import { HttpClient } from './http.interceptor';

export const Services = [
	GlobalVars,
	API,
	HttpClient,
]