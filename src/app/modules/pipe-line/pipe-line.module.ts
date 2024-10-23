import { NgModule } from '@angular/core';
import { NewlineToBrPipe } from '../../pipes/new-line.pipe';

@NgModule({
  declarations: [NewlineToBrPipe],
  exports: [NewlineToBrPipe], // Exporta o pipe para uso em outros módulos
})
export class PipeModule {}