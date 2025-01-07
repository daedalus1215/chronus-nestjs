import { Injectable } from '@nestjs/common';
import {
	HealthCheckService,
	HttpHealthIndicator,
	HealthCheckResult,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
	constructor(
		private health: HealthCheckService,
		private http: HttpHealthIndicator,
	) {}

	async checkHealth(): Promise<HealthCheckResult> {
		return this.health.check([
			async () =>
				this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
			// Add more health indicators here, such as a database check or custom logic
		]);
	}
}