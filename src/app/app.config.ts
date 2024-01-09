import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { InitializerService } from './common/services/initializer.service';
import { HttpErrorHandler } from './common/errors/HttpErrorHandler';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideAnimations(),
		importProvidersFrom(HttpClientModule),
		{ provide: ErrorHandler, useClass: HttpErrorHandler },
		MessageService,
		InitializerService.APP_INITIALIZER_PROVIDER,
	],
};
