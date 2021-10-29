import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var NgxJsonViewerComponent = /** @class */ (function () {
    function NgxJsonViewerComponent() {
        this.expanded = true;
        /**
         * @deprecated It will be always true and deleted in version 3.0.0
         */
        this.cleanOnChange = true;
        this.segments = [];
    }
    NgxJsonViewerComponent.prototype.ngOnChanges = function () {
        var _this = this;
        if (this.cleanOnChange) {
            this.segments = [];
        }
        if (typeof this.json === 'object') {
            Object.keys(this.json).forEach(function (key) {
                _this.segments.push(_this.parseKeyValue(key, _this.json[key]));
            });
        }
        else {
            this.segments.push(this.parseKeyValue("(" + typeof this.json + ")", this.json));
        }
    };
    NgxJsonViewerComponent.prototype.isExpandable = function (segment) {
        return segment.type === 'object' || segment.type === 'array';
    };
    NgxJsonViewerComponent.prototype.toggle = function (segment) {
        if (this.isExpandable(segment)) {
            segment.expanded = !segment.expanded;
        }
    };
    NgxJsonViewerComponent.prototype.parseKeyValue = function (key, value) {
        var segment = {
            key: key,
            value: value,
            type: undefined,
            description: '' + value,
            expanded: this.expanded
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
                    segment.description = 'Array[' + segment.value.length + '] ' + JSON.stringify(segment.value);
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
    };
    tslib_1.__decorate([
        Input()
    ], NgxJsonViewerComponent.prototype, "json", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxJsonViewerComponent.prototype, "expanded", void 0);
    tslib_1.__decorate([
        Input()
    ], NgxJsonViewerComponent.prototype, "cleanOnChange", void 0);
    NgxJsonViewerComponent = tslib_1.__decorate([
        Component({
            selector: 'ngx-json-viewer',
            template: "<section class=\"ngx-json-viewer\">\r\n  <section\r\n    *ngFor=\"let segment of segments\"\r\n    [ngClass]=\"['segment', 'segment-type-' + segment.type]\">\r\n    <section\r\n      (click)=\"toggle(segment)\"\r\n      [ngClass]=\"{\r\n        'segment-main': true,\r\n        'expandable': isExpandable(segment),\r\n        'expanded': segment.expanded\r\n      }\">\r\n      <div *ngIf=\"isExpandable(segment)\" class=\"toggler\"></div>\r\n      <span class=\"segment-key\">{{ segment.key }}</span>\r\n      <span class=\"segment-separator\">: </span>\r\n      <span *ngIf=\"!segment.expanded || !isExpandable(segment)\" class=\"segment-value\">{{ segment.description }}</span>\r\n    </section>\r\n    <section *ngIf=\"segment.expanded && isExpandable(segment)\" class=\"children\">\r\n      <ngx-json-viewer [json]=\"segment.value\" [expanded]=\"expanded\"></ngx-json-viewer>\r\n    </section>\r\n  </section>\r\n</section>\r\n",
            styles: ["@charset \"UTF-8\";.ngx-json-viewer{font-family:monospace;font-size:1em;width:100%;height:100%;overflow:hidden;position:relative}.ngx-json-viewer .segment{padding:2px;margin:1px 1px 1px 12px}.ngx-json-viewer .segment .segment-main{word-wrap:break-word}.ngx-json-viewer .segment .segment-main .toggler{position:absolute;margin-left:-14px;margin-top:3px;font-size:.8em;line-height:1.2em;vertical-align:middle;color:#787878}.ngx-json-viewer .segment .segment-main .toggler::after{display:inline-block;content:\"\u25BA\";transition:transform .1s ease-in}.ngx-json-viewer .segment .segment-main .segment-key{color:#4e187c}.ngx-json-viewer .segment .segment-main .segment-separator{color:#999}.ngx-json-viewer .segment .segment-main .segment-value{color:#000}.ngx-json-viewer .segment .children{margin-left:12px}.ngx-json-viewer .segment-type-string>.segment-main>.segment-value{color:#ff6b6b}.ngx-json-viewer .segment-type-number>.segment-main>.segment-value{color:#009688}.ngx-json-viewer .segment-type-boolean>.segment-main>.segment-value{color:#b938a4}.ngx-json-viewer .segment-type-date>.segment-main>.segment-value{color:#05668d}.ngx-json-viewer .segment-type-array>.segment-main>.segment-value,.ngx-json-viewer .segment-type-function>.segment-main>.segment-value,.ngx-json-viewer .segment-type-object>.segment-main>.segment-value{color:#999}.ngx-json-viewer .segment-type-null>.segment-main>.segment-value,.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-value{color:#fff}.ngx-json-viewer .segment-type-null>.segment-main>.segment-value{background-color:red}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-key{color:#999}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-value{background-color:#999}.ngx-json-viewer .segment-type-array>.segment-main,.ngx-json-viewer .segment-type-object>.segment-main{white-space:nowrap}.ngx-json-viewer .expanded>.toggler::after{transform:rotate(90deg)}.ngx-json-viewer .expandable,.ngx-json-viewer .expandable>.toggler{cursor:pointer}"]
        })
    ], NgxJsonViewerComponent);
    return NgxJsonViewerComponent;
}());
export { NgxJsonViewerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWpzb24tdmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1qc29uLXZpZXdlci8iLCJzb3VyY2VzIjpbInNyYy9uZ3gtanNvbi12aWV3ZXIvbmd4LWpzb24tdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFlNUQ7SUFMQTtRQVFXLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDekI7O1dBRUc7UUFDTSxrQkFBYSxHQUFHLElBQUksQ0FBQztRQUU5QixhQUFRLEdBQWMsRUFBRSxDQUFDO0lBOEUzQixDQUFDO0lBNUVDLDRDQUFXLEdBQVg7UUFBQSxpQkFZQztRQVhDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNwQjtRQUVELElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUUsVUFBQSxHQUFHO2dCQUNqQyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQUksT0FBTyxJQUFJLENBQUMsSUFBSSxNQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDNUU7SUFDSCxDQUFDO0lBRUQsNkNBQVksR0FBWixVQUFhLE9BQWdCO1FBQzNCLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUks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IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNlZ21lbnQge1xyXG4gIGtleTogc3RyaW5nO1xyXG4gIHZhbHVlOiBhbnk7XHJcbiAgdHlwZTogdW5kZWZpbmVkIHwgc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZXhwYW5kZWQ6IGJvb2xlYW47XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWpzb24tdmlld2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWpzb24tdmlld2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZ3gtanNvbi12aWV3ZXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SnNvblZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcblxyXG4gIEBJbnB1dCgpIGpzb246IGFueTtcclxuICBASW5wdXQoKSBleHBhbmRlZCA9IHRydWU7XHJcbiAgLyoqXHJcbiAgICogQGRlcHJlY2F0ZWQgSXQgd2lsbCBiZSBhbHdheXMgdHJ1ZSBhbmQgZGVsZXRlZCBpbiB2ZXJzaW9uIDMuMC4wXHJcbiAgICovXHJcbiAgQElucHV0KCkgY2xlYW5PbkNoYW5nZSA9IHRydWU7XHJcblxyXG4gIHNlZ21lbnRzOiBTZWdtZW50W10gPSBbXTtcclxuXHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICBpZiAodGhpcy5jbGVhbk9uQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXMuanNvbiA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5qc29uKS5mb3JFYWNoKCBrZXkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2VnbWVudHMucHVzaCh0aGlzLnBhcnNlS2V5VmFsdWUoa2V5LCB0aGlzLmpzb25ba2V5XSkpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2VnbWVudHMucHVzaCh0aGlzLnBhcnNlS2V5VmFsdWUoYCgke3R5cGVvZiB0aGlzLmpzb259KWAsIHRoaXMuanNvbikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNFeHBhbmRhYmxlKHNlZ21lbnQ6IFNlZ21lbnQpIHtcclxuICAgIHJldHVybiBzZWdtZW50LnR5cGUgPT09ICdvYmplY3QnIHx8IHNlZ21lbnQudHlwZSA9PT0gJ2FycmF5JztcclxuICB9XHJcblxyXG4gIHRvZ2dsZShzZWdtZW50OiBTZWdtZW50KSB7XHJcbiAgICBpZiAodGhpcy5pc0V4cGFuZGFibGUoc2VnbWVudCkpIHtcclxuICAgICAgc2VnbWVudC5leHBhbmRlZCA9ICFzZWdtZW50LmV4cGFuZGVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXJzZUtleVZhbHVlKGtleTogYW55LCB2YWx1ZTogYW55KTogU2VnbWVudCB7XHJcbiAgICBjb25zdCBzZWdtZW50OiBTZWdtZW50ID0ge1xyXG4gICAgICBrZXk6IGtleSxcclxuICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICB0eXBlOiB1bmRlZmluZWQsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyArIHZhbHVlLFxyXG4gICAgICBleHBhbmRlZDogdGhpcy5leHBhbmRlZFxyXG4gICAgfTtcclxuXHJcbiAgICBzd2l0Y2ggKHR5cGVvZiBzZWdtZW50LnZhbHVlKSB7XHJcbiAgICAgIGNhc2UgJ251bWJlcic6IHtcclxuICAgICAgICBzZWdtZW50LnR5cGUgPSAnbnVtYmVyJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdib29sZWFuJzoge1xyXG4gICAgICAgIHNlZ21lbnQudHlwZSA9ICdib29sZWFuJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdmdW5jdGlvbic6IHtcclxuICAgICAgICBzZWdtZW50LnR5cGUgPSAnZnVuY3Rpb24nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3N0cmluZyc6IHtcclxuICAgICAgICBzZWdtZW50LnR5cGUgPSAnc3RyaW5nJztcclxuICAgICAgICBzZWdtZW50LmRlc2NyaXB0aW9uID0gJ1wiJyArIHNlZ21lbnQudmFsdWUgKyAnXCInO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6IHtcclxuICAgICAgICBzZWdtZW50LnR5cGUgPSAndW5kZWZpbmVkJztcclxuICAgICAgICBzZWdtZW50LmRlc2NyaXB0aW9uID0gJ3VuZGVmaW5lZCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnb2JqZWN0Jzoge1xyXG4gICAgICAgIC8vIHllYSwgbnVsbCBpcyBvYmplY3RcclxuICAgICAgICBpZiAoc2VnbWVudC52YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgc2VnbWVudC50eXBlID0gJ251bGwnO1xyXG4gICAgICAgICAgc2VnbWVudC5kZXNjcmlwdGlvbiA9ICdudWxsJztcclxuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc2VnbWVudC52YWx1ZSkpIHtcclxuICAgICAgICAgIHNlZ21lbnQudHlwZSA9ICdhcnJheSc7XHJcbiAgICAgICAgICBzZWdtZW50LmRlc2NyaXB0aW9uID0gJ0FycmF5WycgKyBzZWdtZW50LnZhbHVlLmxlbmd0aCArICddICcgKyBKU09OLnN0cmluZ2lmeShzZWdtZW50LnZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNlZ21lbnQudmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICBzZWdtZW50LnR5cGUgPSAnZGF0ZSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNlZ21lbnQudHlwZSA9ICdvYmplY3QnO1xyXG4gICAgICAgICAgc2VnbWVudC5kZXNjcmlwdGlvbiA9ICdPYmplY3QgJyArIEpTT04uc3RyaW5naWZ5KHNlZ21lbnQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzZWdtZW50O1xyXG4gIH1cclxufVxyXG4iXX0=