import { Component, Input, ViewChildren } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NgxJsonViewerComponent {
    json;
    expanded = true;
    depth = -1;
    restoreExpanded = false;
    showTypeHeadings = false;
    _key;
    _previouslyOpenKeys;
    _currentDepth = -1;
    segments = [];
    childrenComponents;
    getOpenKeysRecursive() {
        const openKeys = {};
        this.childrenComponents.forEach((component) => {
            // Save key and length
            openKeys[component._key] = component.getOpenKeysRecursive();
        });
        if (Object.keys(openKeys).length === 0) {
            return;
        }
        return openKeys;
    }
    openSegments() {
        const keys = Object.keys(this._previouslyOpenKeys);
        keys.forEach((key) => {
            // Check to see if the key exists, if so expands it
            const foundSegment = this.segments.find((segment) => segment.key === key);
            if (!foundSegment) {
                return;
            }
            if (!this.isExpandable(foundSegment)) {
                return;
            }
            foundSegment.expanded = true;
        });
    }
    ngOnChanges() {
        // Save open keys structure before processing new json
        // Will only run in top level
        if (this.restoreExpanded && this.childrenComponents) {
            this._previouslyOpenKeys = this.getOpenKeysRecursive();
        }
        this.segments = [];
        // remove cycles
        this.json = this.decycle(this.json);
        this._currentDepth++;
        if (typeof this.json === 'object') {
            Object.keys(this.json).forEach((key) => {
                this.segments.push(this.parseKeyValue(key, this.json[key]));
            });
        }
        else {
            this.segments.push(this.parseKeyValue(`(${typeof this.json})`, this.json));
        }
        if (!this._previouslyOpenKeys) {
            return;
        }
        else {
            this.openSegments();
        }
    }
    isExpandable(segment) {
        return segment.type === 'object' || segment.type === 'array';
    }
    toggle(segment) {
        if (this.isExpandable(segment)) {
            segment.expanded = !segment.expanded;
        }
    }
    parseKeyValue(key, value) {
        const segment = {
            key: key,
            value: value,
            type: undefined,
            description: '' + value,
            expanded: this.isExpanded(),
        };
        switch (typeof segment.value) {
            case 'number': {
                segment.type = 'number';
                break;
            }
            case 'boolean': {
                segment.type = 'boolean';
                break;
            }
            case 'function': {
                segment.type = 'function';
                break;
            }
            case 'string': {
                segment.type = 'string';
                segment.description = '"' + segment.value + '"';
                break;
            }
            case 'undefined': {
                segment.type = 'undefined';
                segment.description = 'undefined';
                break;
            }
            case 'object': {
                // yea, null is object
                if (segment.value === null) {
                    segment.type = 'null';
                    segment.description = 'null';
                }
                else if (Array.isArray(segment.value)) {
                    segment.type = 'array';
                    segment.description =
                        'Array[' + segment.value.length + '] ' + JSON.stringify(segment.value);
                }
                else if (segment.value instanceof Date) {
                    segment.type = 'date';
                }
                else {
                    segment.type = 'object';
                    segment.description = 'Object ' + JSON.stringify(segment.value);
                }
                break;
            }
        }
        return segment;
    }
    isExpanded() {
        return this.expanded && !(this.depth > -1 && this._currentDepth >= this.depth);
    }
    // https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
    decycle(object) {
        const objects = new WeakMap();
        return (function derez(value, path) {
            let oldPath;
            let nu;
            if (typeof value === 'object' &&
                value !== null &&
                !(value instanceof Boolean) &&
                !(value instanceof Date) &&
                !(value instanceof Number) &&
                !(value instanceof RegExp) &&
                !(value instanceof String)) {
                oldPath = objects.get(value);
                if (oldPath !== undefined) {
                    return { $ref: oldPath };
                }
                objects.set(value, path);
                if (Array.isArray(value)) {
                    nu = [];
                    value.forEach((element, i) => {
                        nu[i] = derez(element, path + '[' + i + ']');
                    });
                }
                else {
                    nu = {};
                    Object.keys(value).forEach((name) => {
                        nu[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']');
                    });
                }
                return nu;
            }
            return value;
        })(object, '$');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.6", ngImport: i0, type: NgxJsonViewerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.6", type: NgxJsonViewerComponent, selector: "ngx-json-viewer", inputs: { json: "json", expanded: "expanded", depth: "depth", restoreExpanded: "restoreExpanded", showTypeHeadings: "showTypeHeadings", _key: "_key", _previouslyOpenKeys: "_previouslyOpenKeys", _currentDepth: "_currentDepth" }, viewQueries: [{ propertyName: "childrenComponents", predicate: NgxJsonViewerComponent, descendants: true }], usesOnChanges: true, ngImport: i0, template: "<section class=\"ngx-json-viewer\">\r\n  <section *ngFor=\"let segment of segments\" [ngClass]=\"['segment', 'segment-type-' + segment.type]\">\r\n    <section\r\n      (click)=\"toggle(segment)\"\r\n      [ngClass]=\"{\r\n        'segment-main': true,\r\n        expandable: isExpandable(segment),\r\n        expanded: segment.expanded\r\n      }\"\r\n    >\r\n      <div *ngIf=\"isExpandable(segment)\" class=\"toggler\"></div>\r\n      <span class=\"segment-key\">{{ segment.key }}</span>\r\n      <span class=\"segment-separator\">: </span>\r\n      <span *ngIf=\"!segment.expanded || !isExpandable(segment)\" class=\"segment-value\">{{\r\n        segment.description\r\n      }}</span>\r\n      <span\r\n        *ngIf=\"showTypeHeadings && segment.expanded && segment.type == 'array'\"\r\n        class=\"segment-value\"\r\n        >Array[{{ segment.value.length }}]</span\r\n      >\r\n      <span\r\n        *ngIf=\"showTypeHeadings && segment.expanded && segment.type == 'object'\"\r\n        class=\"segment-value\"\r\n        >Object</span\r\n      >\r\n    </section>\r\n    <section *ngIf=\"segment.expanded && isExpandable(segment)\" class=\"children\">\r\n      <ngx-json-viewer\r\n        [json]=\"segment.value\"\r\n        [expanded]=\"expanded\"\r\n        [depth]=\"depth\"\r\n        [showTypeHeadings]=\"showTypeHeadings\"\r\n        [_key]=\"segment.key\"\r\n        [_currentDepth]=\"_currentDepth\"\r\n        [_previouslyOpenKeys]=\"_previouslyOpenKeys && _previouslyOpenKeys[segment.key]\"\r\n      ></ngx-json-viewer>\r\n    </section>\r\n  </section>\r\n</section>\r\n", styles: ["@charset \"UTF-8\";.ngx-json-viewer{font-family:monospace;font-size:1em;width:100%;height:100%;overflow:hidden;position:relative}.ngx-json-viewer .segment{padding:0;margin:0 0 1px 12px}.ngx-json-viewer .segment .segment-main{word-wrap:break-word}.ngx-json-viewer .segment .segment-main .toggler{position:absolute;margin-left:-14px;margin-top:3px;font-size:.8em;line-height:1.2em;vertical-align:middle;color:#787878}.ngx-json-viewer .segment .segment-main .toggler:after{display:inline-block;content:\"\\25ba\";transition:transform .1s ease-in}.ngx-json-viewer .segment .segment-main .segment-key{color:#00008b;word-wrap:break-word;white-space:pre-line}.ngx-json-viewer .segment .segment-main .segment-separator{color:#00008b}.ngx-json-viewer .segment .segment-main .segment-value{color:#000}.ngx-json-viewer .segment .children{margin-left:4px}.ngx-json-viewer .segment-type-string>.segment-main>.segment-value{color:green}.ngx-json-viewer .segment-type-number>.segment-main>.segment-value{color:#00f}.ngx-json-viewer .segment-type-boolean>.segment-main>.segment-value{color:red}.ngx-json-viewer .segment-type-date>.segment-main>.segment-value{color:#05668d}.ngx-json-viewer .segment-type-array>.segment-main>.segment-value{color:#999}.ngx-json-viewer .segment-type-object>.segment-main>.segment-value{color:#999}.ngx-json-viewer .segment-type-function>.segment-main>.segment-value{color:#999}.ngx-json-viewer .segment-type-null>.segment-main>.segment-value{color:#855a00}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-value{color:#855a00}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-key{color:#999}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-value{background-color:#999}.ngx-json-viewer .segment-type-object>.segment-main,.ngx-json-viewer .segment-type-array>.segment-main{white-space:nowrap}.ngx-json-viewer .expanded>.toggler:after{transform:rotate(90deg)}.ngx-json-viewer .expandable>.segment-value{display:inline-block;vertical-align:bottom;text-overflow:ellipsis;overflow:hidden}.ngx-json-viewer .expandable,.ngx-json-viewer .expandable>.toggler{cursor:pointer}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: NgxJsonViewerComponent, selector: "ngx-json-viewer", inputs: ["json", "expanded", "depth", "restoreExpanded", "showTypeHeadings", "_key", "_previouslyOpenKeys", "_currentDepth"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.6", ngImport: i0, type: NgxJsonViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-json-viewer', template: "<section class=\"ngx-json-viewer\">\r\n  <section *ngFor=\"let segment of segments\" [ngClass]=\"['segment', 'segment-type-' + segment.type]\">\r\n    <section\r\n      (click)=\"toggle(segment)\"\r\n      [ngClass]=\"{\r\n        'segment-main': true,\r\n        expandable: isExpandable(segment),\r\n        expanded: segment.expanded\r\n      }\"\r\n    >\r\n      <div *ngIf=\"isExpandable(segment)\" class=\"toggler\"></div>\r\n      <span class=\"segment-key\">{{ segment.key }}</span>\r\n      <span class=\"segment-separator\">: </span>\r\n      <span *ngIf=\"!segment.expanded || !isExpandable(segment)\" class=\"segment-value\">{{\r\n        segment.description\r\n      }}</span>\r\n      <span\r\n        *ngIf=\"showTypeHeadings && segment.expanded && segment.type == 'array'\"\r\n        class=\"segment-value\"\r\n        >Array[{{ segment.value.length }}]</span\r\n      >\r\n      <span\r\n        *ngIf=\"showTypeHeadings && segment.expanded && segment.type == 'object'\"\r\n        class=\"segment-value\"\r\n        >Object</span\r\n      >\r\n    </section>\r\n    <section *ngIf=\"segment.expanded && isExpandable(segment)\" class=\"children\">\r\n      <ngx-json-viewer\r\n        [json]=\"segment.value\"\r\n        [expanded]=\"expanded\"\r\n        [depth]=\"depth\"\r\n        [showTypeHeadings]=\"showTypeHeadings\"\r\n        [_key]=\"segment.key\"\r\n        [_currentDepth]=\"_currentDepth\"\r\n        [_previouslyOpenKeys]=\"_previouslyOpenKeys && _previouslyOpenKeys[segment.key]\"\r\n      ></ngx-json-viewer>\r\n    </section>\r\n  </section>\r\n</section>\r\n", styles: ["@charset \"UTF-8\";.ngx-json-viewer{font-family:monospace;font-size:1em;width:100%;height:100%;overflow:hidden;position:relative}.ngx-json-viewer .segment{padding:0;margin:0 0 1px 12px}.ngx-json-viewer .segment .segment-main{word-wrap:break-word}.ngx-json-viewer .segment .segment-main .toggler{position:absolute;margin-left:-14px;margin-top:3px;font-size:.8em;line-height:1.2em;vertical-align:middle;color:#787878}.ngx-json-viewer .segment .segment-main .toggler:after{display:inline-block;content:\"\\25ba\";transition:transform .1s ease-in}.ngx-json-viewer .segment .segment-main .segment-key{color:#00008b;word-wrap:break-word;white-space:pre-line}.ngx-json-viewer .segment .segment-main .segment-separator{color:#00008b}.ngx-json-viewer .segment .segment-main .segment-value{color:#000}.ngx-json-viewer .segment .children{margin-left:4px}.ngx-json-viewer .segment-type-string>.segment-main>.segment-value{color:green}.ngx-json-viewer .segment-type-number>.segment-main>.segment-value{color:#00f}.ngx-json-viewer .segment-type-boolean>.segment-main>.segment-value{color:red}.ngx-json-viewer .segment-type-date>.segment-main>.segment-value{color:#05668d}.ngx-json-viewer .segment-type-array>.segment-main>.segment-value{color:#999}.ngx-json-viewer .segment-type-object>.segment-main>.segment-value{color:#999}.ngx-json-viewer .segment-type-function>.segment-main>.segment-value{color:#999}.ngx-json-viewer .segment-type-null>.segment-main>.segment-value{color:#855a00}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-value{color:#855a00}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-key{color:#999}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-value{background-color:#999}.ngx-json-viewer .segment-type-object>.segment-main,.ngx-json-viewer .segment-type-array>.segment-main{white-space:nowrap}.ngx-json-viewer .expanded>.toggler:after{transform:rotate(90deg)}.ngx-json-viewer .expandable>.segment-value{display:inline-block;vertical-align:bottom;text-overflow:ellipsis;overflow:hidden}.ngx-json-viewer .expandable,.ngx-json-viewer .expandable>.toggler{cursor:pointer}\n"] }]
        }], propDecorators: { json: [{
                type: Input
            }], expanded: [{
                type: Input
            }], depth: [{
                type: Input
            }], restoreExpanded: [{
                type: Input
            }], showTypeHeadings: [{
                type: Input
            }], _key: [{
                type: Input
            }], _previouslyOpenKeys: [{
                type: Input
            }], _currentDepth: [{
                type: Input
            }], childrenComponents: [{
                type: ViewChildren,
                args: [NgxJsonViewerComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWpzb24tdmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uZ3gtanNvbi12aWV3ZXIvbmd4LWpzb24tdmlld2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy9uZ3gtanNvbi12aWV3ZXIvbmd4LWpzb24tdmlld2VyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWEsS0FBSyxFQUFFLFlBQVksRUFBWSxNQUFNLGVBQWUsQ0FBQzs7O0FBZW5GLE1BQU0sT0FBTyxzQkFBc0I7SUFDakIsSUFBSSxDQUFNO0lBQ1YsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNoQixLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDWCxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLGdCQUFnQixHQUFHLEtBQUssQ0FBQztJQUV6QixJQUFJLENBQVM7SUFDYixtQkFBbUIsQ0FBd0I7SUFDM0MsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRTVCLFFBQVEsR0FBZSxFQUFFLENBQUM7SUFHMUIsa0JBQWtCLENBQW9DO0lBRXJELG9CQUFvQjtRQUMxQixNQUFNLFFBQVEsR0FBeUIsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM1QyxzQkFBc0I7WUFDdEIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3RDLE9BQU87U0FDUjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFTyxZQUFZO1FBQ2xCLE1BQU0sSUFBSSxHQUFHLE1B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ZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0LCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTZWdtZW50IHtcclxuICBrZXk6IHN0cmluZztcclxuICB2YWx1ZTogYW55O1xyXG4gIHR5cGU6IHVuZGVmaW5lZCB8IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGV4cGFuZGVkOiBib29sZWFuO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1qc29uLXZpZXdlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1qc29uLXZpZXdlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWpzb24tdmlld2VyLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hKc29uVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBwdWJsaWMganNvbjogYW55O1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBleHBhbmRlZCA9IHRydWU7XHJcbiAgQElucHV0KCkgcHVibGljIGRlcHRoID0gLTE7XHJcbiAgQElucHV0KCkgcHVibGljIHJlc3RvcmVFeHBhbmRlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBzaG93VHlwZUhlYWRpbmdzID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBfa2V5OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIF9wcmV2aW91c2x5T3BlbktleXM/OiB7W2tleTogc3RyaW5nXTogYW55fTtcclxuICBASW5wdXQoKSBwdWJsaWMgX2N1cnJlbnREZXB0aCA9IC0xO1xyXG5cclxuICBwdWJsaWMgc2VnbWVudHM6IElTZWdtZW50W10gPSBbXTtcclxuXHJcbiAgQFZpZXdDaGlsZHJlbihOZ3hKc29uVmlld2VyQ29tcG9uZW50KVxyXG4gIHB1YmxpYyBjaGlsZHJlbkNvbXBvbmVudHM6IFF1ZXJ5TGlzdDxOZ3hKc29uVmlld2VyQ29tcG9uZW50PjtcclxuXHJcbiAgcHJpdmF0ZSBnZXRPcGVuS2V5c1JlY3Vyc2l2ZSgpOiBhbnkge1xyXG4gICAgY29uc3Qgb3BlbktleXM6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XHJcbiAgICB0aGlzLmNoaWxkcmVuQ29tcG9uZW50cy5mb3JFYWNoKChjb21wb25lbnQpID0+IHtcclxuICAgICAgLy8gU2F2ZSBrZXkgYW5kIGxlbmd0aFxyXG4gICAgICBvcGVuS2V5c1tjb21wb25lbnQuX2tleV0gPSBjb21wb25lbnQuZ2V0T3BlbktleXNSZWN1cnNpdmUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChPYmplY3Qua2V5cyhvcGVuS2V5cykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJldHVybiBvcGVuS2V5cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb3BlblNlZ21lbnRzKCk6IHZvaWQge1xyXG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX3ByZXZpb3VzbHlPcGVuS2V5cyEpO1xyXG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBrZXkgZXhpc3RzLCBpZiBzbyBleHBhbmRzIGl0XHJcbiAgICAgIGNvbnN0IGZvdW5kU2VnbWVudCA9IHRoaXMuc2VnbWVudHMuZmluZCgoc2VnbWVudCkgPT4gc2VnbWVudC5rZXkgPT09IGtleSk7XHJcblxyXG4gICAgICBpZiAoIWZvdW5kU2VnbWVudCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLmlzRXhwYW5kYWJsZShmb3VuZFNlZ21lbnQpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3VuZFNlZ21lbnQuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICAvLyBTYXZlIG9wZW4ga2V5cyBzdHJ1Y3R1cmUgYmVmb3JlIHByb2Nlc3NpbmcgbmV3IGpzb25cclxuICAgIC8vIFdpbGwgb25seSBydW4gaW4gdG9wIGxldmVsXHJcbiAgICBpZiAodGhpcy5yZXN0b3JlRXhwYW5kZWQgJiYgdGhpcy5jaGlsZHJlbkNvbXBvbmVudHMpIHtcclxuICAgICAgdGhpcy5fcHJldmlvdXNseU9wZW5LZXlzID0gdGhpcy5nZXRPcGVuS2V5c1JlY3Vyc2l2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcclxuXHJcbiAgICAvLyByZW1vdmUgY3ljbGVzXHJcbiAgICB0aGlzLmpzb24gPSB0aGlzLmRlY3ljbGUodGhpcy5qc29uKTtcclxuXHJcbiAgICB0aGlzLl9jdXJyZW50RGVwdGgrKztcclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMuanNvbiA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5qc29uKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICB0aGlzLnNlZ21lbnRzLnB1c2godGhpcy5wYXJzZUtleVZhbHVlKGtleSwgdGhpcy5qc29uW2tleV0pKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlZ21lbnRzLnB1c2godGhpcy5wYXJzZUtleVZhbHVlKGAoJHt0eXBlb2YgdGhpcy5qc29ufSlgLCB0aGlzLmpzb24pKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX3ByZXZpb3VzbHlPcGVuS2V5cykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9wZW5TZWdtZW50cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzRXhwYW5kYWJsZShzZWdtZW50OiBJU2VnbWVudCk6IGFueSB7XHJcbiAgICByZXR1cm4gc2VnbWVudC50eXBlID09PSAnb2JqZWN0JyB8fCBzZWdtZW50LnR5cGUgPT09ICdhcnJheSc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9nZ2xlKHNlZ21lbnQ6IElTZWdtZW50KTogYW55IHtcclxuICAgIGlmICh0aGlzLmlzRXhwYW5kYWJsZShzZWdtZW50KSkge1xyXG4gICAgICBzZWdtZW50LmV4cGFuZGVkID0gIXNlZ21lbnQuZXhwYW5kZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlS2V5VmFsdWUoa2V5OiBhbnksIHZhbHVlOiBhbnkpOiBJU2VnbWVudCB7XHJcbiAgICBjb25zdCBzZWdtZW50OiBJU2VnbWVudCA9IHtcclxuICAgICAga2V5OiBrZXksXHJcbiAgICAgIHZhbHVlOiB2YWx1ZSxcclxuICAgICAgdHlwZTogdW5kZWZpbmVkLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJycgKyB2YWx1ZSxcclxuICAgICAgZXhwYW5kZWQ6IHRoaXMuaXNFeHBhbmRlZCgpLFxyXG4gICAgfTtcclxuXHJcbiAgICBzd2l0Y2ggKHR5cGVvZiBzZWdtZW50LnZhbHVlKSB7XHJcbiAgICAgIGNhc2UgJ251bWJlcic6IHtcclxuICAgICAgICBzZWdtZW50LnR5cGUgPSAnbnVtYmVyJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdib29sZWFuJzoge1xyXG4gICAgICAgIHNlZ21lbnQudHlwZSA9ICdib29sZWFuJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdmdW5jdGlvbic6IHtcclxuICAgICAgICBzZWdtZW50LnR5cGUgPSAnZnVuY3Rpb24nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3N0cmluZyc6IHtcclxuICAgICAgICBzZWdtZW50LnR5cGUgPSAnc3RyaW5nJztcclxuICAgICAgICBzZWdtZW50LmRlc2NyaXB0aW9uID0gJ1wiJyArIHNlZ21lbnQudmFsdWUgKyAnXCInO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6IHtcclxuICAgICAgICBzZWdtZW50LnR5cGUgPSAndW5kZWZpbmVkJztcclxuICAgICAgICBzZWdtZW50LmRlc2NyaXB0aW9uID0gJ3VuZGVmaW5lZCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnb2JqZWN0Jzoge1xyXG4gICAgICAgIC8vIHllYSwgbnVsbCBpcyBvYmplY3RcclxuICAgICAgICBpZiAoc2VnbWVudC52YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgc2VnbWVudC50eXBlID0gJ251bGwnO1xyXG4gICAgICAgICAgc2VnbWVudC5kZXNjcmlwdGlvbiA9ICdudWxsJztcclxuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc2VnbWVudC52YWx1ZSkpIHtcclxuICAgICAgICAgIHNlZ21lbnQudHlwZSA9ICdhcnJheSc7XHJcbiAgICAgICAgICBzZWdtZW50LmRlc2NyaXB0aW9uID1cclxuICAgICAgICAgICAgJ0FycmF5WycgKyBzZWdtZW50LnZhbHVlLmxlbmd0aCArICddICcgKyBKU09OLnN0cmluZ2lmeShzZWdtZW50LnZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlZ21lbnQudmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICBzZWdtZW50LnR5cGUgPSAnZGF0ZSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNlZ21lbnQudHlwZSA9ICdvYmplY3QnO1xyXG4gICAgICAgICAgc2VnbWVudC5kZXNjcmlwdGlvbiA9ICdPYmplY3QgJyArIEpTT04uc3RyaW5naWZ5KHNlZ21lbnQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzZWdtZW50O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0V4cGFuZGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kZWQgJiYgISh0aGlzLmRlcHRoID4gLTEgJiYgdGhpcy5fY3VycmVudERlcHRoID49IHRoaXMuZGVwdGgpO1xyXG4gIH1cclxuXHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2RvdWdsYXNjcm9ja2ZvcmQvSlNPTi1qcy9ibG9iL21hc3Rlci9jeWNsZS5qc1xyXG4gIHByaXZhdGUgZGVjeWNsZShvYmplY3Q6IGFueSk6IGFueSB7XHJcbiAgICBjb25zdCBvYmplY3RzID0gbmV3IFdlYWtNYXAoKTtcclxuICAgIHJldHVybiAoZnVuY3Rpb24gZGVyZXoodmFsdWU6IGFueSwgcGF0aDogYW55KTogYW55IHtcclxuICAgICAgbGV0IG9sZFBhdGg7XHJcbiAgICAgIGxldCBudTogYW55O1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcclxuICAgICAgICB2YWx1ZSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICEodmFsdWUgaW5zdGFuY2VvZiBCb29sZWFuKSAmJlxyXG4gICAgICAgICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSAmJlxyXG4gICAgICAgICEodmFsdWUgaW5zdGFuY2VvZiBOdW1iZXIpICYmXHJcbiAgICAgICAgISh2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkgJiZcclxuICAgICAgICAhKHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nKVxyXG4gICAgICApIHtcclxuICAgICAgICBvbGRQYXRoID0gb2JqZWN0cy5nZXQodmFsdWUpO1xyXG4gICAgICAgIGlmIChvbGRQYXRoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHJldHVybiB7JHJlZjogb2xkUGF0aH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9iamVjdHMuc2V0KHZhbHVlLCBwYXRoKTtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICBudSA9IFtdO1xyXG4gICAgICAgICAgdmFsdWUuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xyXG4gICAgICAgICAgICBudVtpXSA9IGRlcmV6KGVsZW1lbnQsIHBhdGggKyAnWycgKyBpICsgJ10nKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBudSA9IHt9O1xyXG4gICAgICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goKG5hbWUpID0+IHtcclxuICAgICAgICAgICAgbnVbbmFtZV0gPSBkZXJleih2YWx1ZVtuYW1lXSwgcGF0aCArICdbJyArIEpTT04uc3RyaW5naWZ5KG5hbWUpICsgJ10nKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSkob2JqZWN0LCAnJCcpO1xyXG4gIH1cclxufVxyXG4iLCI8c2VjdGlvbiBjbGFzcz1cIm5neC1qc29uLXZpZXdlclwiPlxyXG4gIDxzZWN0aW9uICpuZ0Zvcj1cImxldCBzZWdtZW50IG9mIHNlZ21lbnRzXCIgW25nQ2xhc3NdPVwiWydzZWdtZW50JywgJ3NlZ21lbnQtdHlwZS0nICsgc2VnbWVudC50eXBlXVwiPlxyXG4gICAgPHNlY3Rpb25cclxuICAgICAgKGNsaWNrKT1cInRvZ2dsZShzZWdtZW50KVwiXHJcbiAgICAgIFtuZ0NsYXNzXT1cIntcclxuICAgICAgICAnc2VnbWVudC1tYWluJzogdHJ1ZSxcclxuICAgICAgICBleHBhbmRhYmxlOiBpc0V4cGFuZGFibGUoc2VnbWVudCksXHJcbiAgICAgICAgZXhwYW5kZWQ6IHNlZ21lbnQuZXhwYW5kZWRcclxuICAgICAgfVwiXHJcbiAgICA+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJpc0V4cGFuZGFibGUoc2VnbWVudClcIiBjbGFzcz1cInRvZ2dsZXJcIj48L2Rpdj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWdtZW50LWtleVwiPnt7IHNlZ21lbnQua2V5IH19PC9zcGFuPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cInNlZ21lbnQtc2VwYXJhdG9yXCI+OiA8L3NwYW4+XHJcbiAgICAgIDxzcGFuICpuZ0lmPVwiIXNlZ21lbnQuZXhwYW5kZWQgfHwgIWlzRXhwYW5kYWJsZShzZWdtZW50KVwiIGNsYXNzPVwic2VnbWVudC12YWx1ZVwiPnt7XHJcbiAgICAgICAgc2VnbWVudC5kZXNjcmlwdGlvblxyXG4gICAgICB9fTwvc3Bhbj5cclxuICAgICAgPHNwYW5cclxuICAgICAgICAqbmdJZj1cInNob3dUeXBlSGVhZGluZ3MgJiYgc2VnbWVudC5leHBhbmRlZCAmJiBzZWdtZW50LnR5cGUgPT0gJ2FycmF5J1wiXHJcbiAgICAgICAgY2xhc3M9XCJzZWdtZW50LXZhbHVlXCJcclxuICAgICAgICA+QXJyYXlbe3sgc2VnbWVudC52YWx1ZS5sZW5ndGggfX1dPC9zcGFuXHJcbiAgICAgID5cclxuICAgICAgPHNwYW5cclxuICAgICAgICAqbmdJZj1cInNob3dUeXBlSGVhZGluZ3MgJiYgc2VnbWVudC5leHBhbmRlZCAmJiBzZWdtZW50LnR5cGUgPT0gJ29iamVjdCdcIlxyXG4gICAgICAgIGNsYXNzPVwic2VnbWVudC12YWx1ZVwiXHJcbiAgICAgICAgPk9iamVjdDwvc3BhblxyXG4gICAgICA+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgICA8c2VjdGlvbiAqbmdJZj1cInNlZ21lbnQuZXhwYW5kZWQgJiYgaXNFeHBhbmRhYmxlKHNlZ21lbnQpXCIgY2xhc3M9XCJjaGlsZHJlblwiPlxyXG4gICAgICA8bmd4LWpzb24tdmlld2VyXHJcbiAgICAgICAgW2pzb25dPVwic2VnbWVudC52YWx1ZVwiXHJcbiAgICAgICAgW2V4cGFuZGVkXT1cImV4cGFuZGVkXCJcclxuICAgICAgICBbZGVwdGhdPVwiZGVwdGhcIlxyXG4gICAgICAgIFtzaG93VHlwZUhlYWRpbmdzXT1cInNob3dUeXBlSGVhZGluZ3NcIlxyXG4gICAgICAgIFtfa2V5XT1cInNlZ21lbnQua2V5XCJcclxuICAgICAgICBbX2N1cnJlbnREZXB0aF09XCJfY3VycmVudERlcHRoXCJcclxuICAgICAgICBbX3ByZXZpb3VzbHlPcGVuS2V5c109XCJfcHJldmlvdXNseU9wZW5LZXlzICYmIF9wcmV2aW91c2x5T3BlbktleXNbc2VnbWVudC5rZXldXCJcclxuICAgICAgPjwvbmd4LWpzb24tdmlld2VyPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gIDwvc2VjdGlvbj5cclxuPC9zZWN0aW9uPlxyXG4iXX0=