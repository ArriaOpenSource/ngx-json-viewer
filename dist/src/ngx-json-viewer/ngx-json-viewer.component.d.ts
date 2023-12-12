import { OnChanges, QueryList } from '@angular/core';
import * as i0 from "@angular/core";
export interface ISegment {
    key: string;
    value: any;
    type: undefined | string;
    description: string;
    expanded: boolean;
}
export declare class NgxJsonViewerComponent implements OnChanges {
    json: any;
    expanded: boolean;
    depth: number;
    restoreExpanded: boolean;
    showTypeHeadings: boolean;
    _key: string;
    _previouslyOpenKeys?: {
        [key: string]: any;
    };
    _currentDepth: number;
    segments: ISegment[];
    childrenComponents: QueryList<NgxJsonViewerComponent>;
    private getOpenKeysRecursive;
    private openSegments;
    ngOnChanges(): void;
    isExpandable(segment: ISegment): any;
    toggle(segment: ISegment): any;
    private parseKeyValue;
    private isExpanded;
    private decycle;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxJsonViewerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxJsonViewerComponent, "ngx-json-viewer", never, { "json": { "alias": "json"; "required": false; }; "expanded": { "alias": "expanded"; "required": false; }; "depth": { "alias": "depth"; "required": false; }; "restoreExpanded": { "alias": "restoreExpanded"; "required": false; }; "showTypeHeadings": { "alias": "showTypeHeadings"; "required": false; }; "_key": { "alias": "_key"; "required": false; }; "_previouslyOpenKeys": { "alias": "_previouslyOpenKeys"; "required": false; }; "_currentDepth": { "alias": "_currentDepth"; "required": false; }; }, {}, never, never, false, never>;
}
