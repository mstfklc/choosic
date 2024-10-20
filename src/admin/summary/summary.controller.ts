import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('summary')
@ApiTags('admin/summary')
export class SummaryController {}
