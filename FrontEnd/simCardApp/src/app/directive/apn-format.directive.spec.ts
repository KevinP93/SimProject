import { ApnFormatDirective } from './apn-format.directive';
import { NgModel, FormControl } from '@angular/forms';
import { Renderer2, ElementRef } from '@angular/core';

describe('ApnFormatDirective', () => {
  it('should create an instance', () => {
    // Créez des objets simulés pour NgModel, Renderer2 et ElementRef
    const ngModelMock = { control: new FormControl() } as NgModel;
    const rendererMock = {} as Renderer2;
    const elementRefMock = {} as ElementRef;

    // Créez une instance de la directive avec des objets simulés
    const directive = new ApnFormatDirective(rendererMock, ngModelMock);

    // Vérifiez que l'instance a été créée
    expect(directive).toBeTruthy();
  });
});
