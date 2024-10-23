import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'newlineToBr' })
export class NewlineToBrPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(value: string | undefined): SafeHtml {
        const escapedValue = value?.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const htmlValue = escapedValue?.replace(/\n/g, '<br/>');
        return this.sanitizer.bypassSecurityTrustHtml(htmlValue!); 
    }
}