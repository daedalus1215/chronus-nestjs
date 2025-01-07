import { Controller, Get } from '@nestjs/common';
import { HealthService } from 'src/health/domain/health.service';

@Controller('health')
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Get()
	check() {
		return this.healthService.checkHealth();
	}
}