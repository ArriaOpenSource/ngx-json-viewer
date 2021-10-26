import { Component, Input } from '@angular/core';
export class NgxJsonViewerComponent {
    constructor() {
        this.expanded = true;
        /**
         * @deprecated It will be always true and deleted in version 3.0.0
         */
        this.cleanOnChange = true;
        this.segments = [];
    }
    ngOnChanges() {
        if (this.cleanOnChange) {
            this.segments = [];
        }
        if (typeof this.json === 'object') {
            Object.keys(this.json).forEach(key => {
                this.segments.push(this.parseKeyValue(key, this.json[key]));
            });
        }
        else {
            this.segments.push(this.parseKeyValue(`(${typeof this.json})`, this.json));
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
    }
}
NgxJsonViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-json-viewer',
                template: "<section class=\"ngx-json-viewer\">\r\n  <section\r\n    *ngFor=\"let segment of segments\"\r\n    [ngClass]=\"['segment', 'segment-type-' + segment.type]\">\r\n    <section\r\n      (click)=\"toggle(segment)\"\r\n      [ngClass]=\"{\r\n        'segment-main': true,\r\n        'expandable': isExpandable(segment),\r\n        'expanded': segment.expanded\r\n      }\">\r\n      <div *ngIf=\"isExpandable(segment)\" class=\"toggler\"></div>\r\n      <span class=\"segment-key\">{{ segment.key }}</span>\r\n      <span class=\"segment-separator\">: </span>\r\n      <span *ngIf=\"!segment.expanded || !isExpandable(segment)\" class=\"segment-value\">{{ segment.description }}</span>\r\n    </section>\r\n    <section *ngIf=\"segment.expanded && isExpandable(segment)\" class=\"children\">\r\n      <ngx-json-viewer [json]=\"segment.value\" [expanded]=\"expanded\"></ngx-json-viewer>\r\n    </section>\r\n  </section>\r\n</section>\r\n",
                styles: ["@charset \"UTF-8\";.ngx-json-viewer{font-family:monospace;font-size:1em;width:100%;height:100%;overflow:hidden;position:relative}.ngx-json-viewer .segment{padding:2px;margin:1px 1px 1px 12px}.ngx-json-viewer .segment .segment-main{word-wrap:break-word}.ngx-json-viewer .segment .segment-main .toggler{position:absolute;margin-left:-14px;margin-top:3px;font-size:.8em;line-height:1.2em;vertical-align:middle;color:#787878}.ngx-json-viewer .segment .segment-main .toggler:after{display:inline-block;content:\"\u25BA\";transition:transform .1s ease-in}.ngx-json-viewer .segment .segment-main .segment-key{color:#4e187c}.ngx-json-viewer .segment .segment-main .segment-separator{color:#999}.ngx-json-viewer .segment .segment-main .segment-value{color:#000}.ngx-json-viewer .segment .children{margin-left:12px}.ngx-json-viewer .segment-type-string>.segment-main>.segment-value{color:#ff6b6b}.ngx-json-viewer .segment-type-number>.segment-main>.segment-value{color:#009688}.ngx-json-viewer .segment-type-boolean>.segment-main>.segment-value{color:#b938a4}.ngx-json-viewer .segment-type-date>.segment-main>.segment-value{color:#05668d}.ngx-json-viewer .segment-type-array>.segment-main>.segment-value,.ngx-json-viewer .segment-type-function>.segment-main>.segment-value,.ngx-json-viewer .segment-type-object>.segment-main>.segment-value{color:#999}.ngx-json-viewer .segment-type-null>.segment-main>.segment-value,.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-value{color:#fff}.ngx-json-viewer .segment-type-null>.segment-main>.segment-value{background-color:red}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-key{color:#999}.ngx-json-viewer .segment-type-undefined>.segment-main>.segment-value{background-color:#999}.ngx-json-viewer .segment-type-array>.segment-main,.ngx-json-viewer .segment-type-object>.segment-main{white-space:nowrap}.ngx-json-viewer .expanded>.toggler:after{transform:rotate(90deg)}.ngx-json-viewer .expandable,.ngx-json-viewer .expandable>.toggler{cursor:pointer}"]
            },] }
];
NgxJsonViewerComponent.propDecorators = {
    json: [{ type: Input }],
    expanded: [{ type: Input }],
    cleanOnChange: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWpzb24tdmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9uZ3gtanNvbi12aWV3ZXIvbmd4LWpzb24tdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFhLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWU1RCxNQUFNLE9BQU8sc0JBQXNCO0lBTG5DO1FBUVcsYUFBUSxHQUFHLElBQUksQ0FBQztRQUN6Qjs7V0FFRztRQUNNLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTlCLGFBQVEsR0FBYyxFQUFFLENBQUM7SUE4RTNCLENBQUM7SUE1RUMsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztTQUNwQjtRQUVELElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM1RTtJQUNILENBQUM7SUFFRCxZQUFZLENBQUMsT0FBZ0I7UUFDM0IsT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQztJQUMvRCxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQWdCO1FBQ3JCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5QixPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztTQUN0QztJQUNILENBQUM7SUFFTyxhQUFhLENBQUMsR0FBUSxFQUFFLEtBQVU7UUFDeEMsTUFBTSxPQUFPLEdBQVk7WUFDdkIsR0FBRyxFQUFFLEdBQUc7WUFDUixLQUFLLEVBQUUsS0FBSztZQUNaLElBQUksRUFBRSxTQUFTO1lBQ2YsV0FBVyxFQUFFLEVBQUUsR0FBRyxLQUFLO1lBQ3ZCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO1FBRUYsUUFBUSxPQUFPLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDNUIsS0FBSyxRQUFRLENBQUMsQ0FBQztnQkFDYixPQUFPLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztnQkFDeEIsTUFBTTthQUNQO1lBQ0QsS0FBSyxTQUFTLENBQUMsQ0FBQztnQkFDZCxPQUFPLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztnQkFDekIsTUFBTTthQUNQO1lBQ0QsS0FBSyxVQUFVLENBQUMsQ0FBQztnQkFDZixPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztnQkFDMUIsTUFBTTthQUNQO1lBQ0QsS0FBSyxRQUFRLENBQUMsQ0FBQztnQkFDYixPQUFPLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQ2hELE1BQU07YUFDUDtZQUNELEtBQUssV0FBVyxDQUFDLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO2dCQUMzQixPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztnQkFDbEMsTUFBTTthQUNQO1lBQ0QsS0FBSyxRQUFRLENBQUMsQ0FBQztnQkFDYixzQkFBc0I7Z0JBQ3RCLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQzFCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO29CQUN0QixPQUFPLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztpQkFDOUI7cUJBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDdkMsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7b0JBQ3ZCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDOUY7cUJBQU0sSUFBSSxPQUFPLENBQUMsS0FBSyxZQUFZLElBQUksRUFBRTtvQkFDeEMsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7aUJBQ3ZCO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO29CQUN4QixPQUFPLENBQUMsV0FBVyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakU7Z0JBQ0QsTUFBTTthQUNQO1NBQ0Y7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7WUEzRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLGc3QkFBK0M7O2FBRWhEOzs7bUJBR0UsS0FBSzt1QkFDTCxLQUFLOzRCQUlMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VnbWVudCB7XHJcbiAga2V5OiBzdHJpbmc7XHJcbiAgdmFsdWU6IGFueTtcclxuICB0eXBlOiB1bmRlZmluZWQgfCBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBleHBhbmRlZDogYm9vbGVhbjtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtanNvbi12aWV3ZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtanNvbi12aWV3ZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL25neC1qc29uLXZpZXdlci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hKc29uVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuXHJcbiAgQElucHV0KCkganNvbjogYW55O1xyXG4gIEBJbnB1dCgpIGV4cGFuZGVkID0gdHJ1ZTtcclxuICAvKipcclxuICAgKiBAZGVwcmVjYXRlZCBJdCB3aWxsIGJlIGFsd2F5cyB0cnVlIGFuZCBkZWxldGVkIGluIHZlcnNpb24gMy4wLjBcclxuICAgKi9cclxuICBASW5wdXQoKSBjbGVhbk9uQ2hhbmdlID0gdHJ1ZTtcclxuXHJcbiAgc2VnbWVudHM6IFNlZ21lbnRbXSA9IFtdO1xyXG5cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIGlmICh0aGlzLmNsZWFuT25DaGFuZ2UpIHtcclxuICAgICAgdGhpcy5zZWdtZW50cyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5qc29uID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmpzb24pLmZvckVhY2goIGtleSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKHRoaXMucGFyc2VLZXlWYWx1ZShrZXksIHRoaXMuanNvbltrZXldKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKHRoaXMucGFyc2VLZXlWYWx1ZShgKCR7dHlwZW9mIHRoaXMuanNvbn0pYCwgdGhpcy5qc29uKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc0V4cGFuZGFibGUoc2VnbWVudDogU2VnbWVudCkge1xyXG4gICAgcmV0dXJuIHNlZ21lbnQudHlwZSA9PT0gJ29iamVjdCcgfHwgc2VnbWVudC50eXBlID09PSAnYXJyYXknO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlKHNlZ21lbnQ6IFNlZ21lbnQpIHtcclxuICAgIGlmICh0aGlzLmlzRXhwYW5kYWJsZShzZWdtZW50KSkge1xyXG4gICAgICBzZWdtZW50LmV4cGFuZGVkID0gIXNlZ21lbnQuZXhwYW5kZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBhcnNlS2V5VmFsdWUoa2V5OiBhbnksIHZhbHVlOiBhbnkpOiBTZWdtZW50IHtcclxuICAgIGNvbnN0IHNlZ21lbnQ6IFNlZ21lbnQgPSB7XHJcbiAgICAgIGtleToga2V5LFxyXG4gICAgICB2YWx1ZTogdmFsdWUsXHJcbiAgICAgIHR5cGU6IHVuZGVmaW5lZCxcclxuICAgICAgZGVzY3JpcHRpb246ICcnICsgdmFsdWUsXHJcbiAgICAgIGV4cGFuZGVkOiB0aGlzLmV4cGFuZGVkXHJcbiAgICB9O1xyXG5cclxuICAgIHN3aXRjaCAodHlwZW9mIHNlZ21lbnQudmFsdWUpIHtcclxuICAgICAgY2FzZSAnbnVtYmVyJzoge1xyXG4gICAgICAgIHNlZ21lbnQudHlwZSA9ICdudW1iZXInO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOiB7XHJcbiAgICAgICAgc2VnbWVudC50eXBlID0gJ2Jvb2xlYW4nO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzoge1xyXG4gICAgICAgIHNlZ21lbnQudHlwZSA9ICdmdW5jdGlvbic7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnc3RyaW5nJzoge1xyXG4gICAgICAgIHNlZ21lbnQudHlwZSA9ICdzdHJpbmcnO1xyXG4gICAgICAgIHNlZ21lbnQuZGVzY3JpcHRpb24gPSAnXCInICsgc2VnbWVudC52YWx1ZSArICdcIic7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAndW5kZWZpbmVkJzoge1xyXG4gICAgICAgIHNlZ21lbnQudHlwZSA9ICd1bmRlZmluZWQnO1xyXG4gICAgICAgIHNlZ21lbnQuZGVzY3JpcHRpb24gPSAndW5kZWZpbmVkJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdvYmplY3QnOiB7XHJcbiAgICAgICAgLy8geWVhLCBudWxsIGlzIG9iamVjdFxyXG4gICAgICAgIGlmIChzZWdtZW50LnZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICBzZWdtZW50LnR5cGUgPSAnbnVsbCc7XHJcbiAgICAgICAgICBzZWdtZW50LmRlc2NyaXB0aW9uID0gJ251bGwnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzZWdtZW50LnZhbHVlKSkge1xyXG4gICAgICAgICAgc2VnbWVudC50eXBlID0gJ2FycmF5JztcclxuICAgICAgICAgIHNlZ21lbnQuZGVzY3JpcHRpb24gPSAnQXJyYXlbJyArIHNlZ21lbnQudmFsdWUubGVuZ3RoICsgJ10gJyArIEpTT04uc3RyaW5naWZ5KHNlZ21lbnQudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VnbWVudC52YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgIHNlZ21lbnQudHlwZSA9ICdkYXRlJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2VnbWVudC50eXBlID0gJ29iamVjdCc7XHJcbiAgICAgICAgICBzZWdtZW50LmRlc2NyaXB0aW9uID0gJ09iamVjdCAnICsgSlNPTi5zdHJpbmdpZnkoc2VnbWVudC52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNlZ21lbnQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==