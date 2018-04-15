/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// this file will contains the different generic functions which
// will be called by the different tests
// inspired by this methodology
// http://www.lindstromhenrik.com/using-protractor-with-coffeescript/
const BasePage = require("./base.coffee");

class SettingsPage extends BasePage {
    constructor(builder) {
        {
          // Hack: trick Babel/TypeScript into allowing this before super.
          if (false) { super(); }
          let thisFn = (() => { return this; }).toString();
          let thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim();
          eval(`${thisName} = this;`);
        }
        this.builder = builder;
    }


    goSettings() {
        return browser.get('#/settings');
    }
    getItem(group, name) {
        return  element(By.css(`form[name='${group}'] [name='${name}']`));
    }
    changeScallingFactor(scallingVar) {
        const scallingFactorForm = this.getItem("Waterfall", "scaling_waterfall");
        return scallingFactorForm.clear().then(() => scallingFactorForm.sendKeys(scallingVar));
    }

    checkScallingFactor(scallingVar) {
        const scallingFactor = this.getItem("Waterfall", "scaling_waterfall");
        return expect(scallingFactor.getAttribute('value')).toEqual(scallingVar);
    }

    changeColumnWidth(columnVar) {
        const columnWidthForm = this.getItem("Waterfall", "min_column_width_waterfall");
        return columnWidthForm.clear().then(() => columnWidthForm.sendKeys(columnVar));
    }

    checkColumnWidth(columnVar) {
        const columnWidthForm = this.getItem("Waterfall", "min_column_width_waterfall");
        return expect(columnWidthForm.getAttribute('value')).toEqual(columnVar);
    }

    changeLazyLoadingLimit(lazyLoadingLimit) {
        const lazyLoadingLimitForm = this.getItem("Waterfall", "lazy_limit_waterfall");
        return lazyLoadingLimitForm.clear().then(() => lazyLoadingLimitForm.sendKeys(lazyLoadingLimit));
    }

    checkLazyLoadingLimit(lazyLoadingLimit) {
        const lazyLoadingLimitForm = this.getItem("Waterfall", "lazy_limit_waterfall");
        return expect(lazyLoadingLimitForm.getAttribute('value')).toEqual(lazyLoadingLimit);
    }

    changeIdleTime(idleTimeVar) {
        const idleTimeForm = this.getItem("Waterfall", "idle_threshold_waterfall");
        return idleTimeForm.clear().then(() => idleTimeForm.sendKeys(idleTimeVar));
    }

    checkIdleTime(idleTimeVar) {
        const idleTimeForm = this.getItem("Waterfall", "idle_threshold_waterfall");
        return expect(idleTimeForm.getAttribute('value')).toEqual(idleTimeVar);
    }

    changeMaxBuild(maxBuildVar) {
        const maxBuildForm = this.getItem("Console", "buildLimit");
        return maxBuildForm.clear().then(() => maxBuildForm.sendKeys(maxBuildVar));
    }

    checkMaxBuild(maxBuildVar) {
        const maxBuildForm = this.getItem("Console", "buildLimit");
        return expect(maxBuildForm.getAttribute('value')).toEqual(maxBuildVar);
    }

    changeMaxRecentsBuilders(maxBuildersVar) {
        const maxBuilderForm = this.getItem("Console", "changeLimit");
        return maxBuilderForm.clear().then(() => maxBuilderForm.sendKeys(maxBuildersVar));
    }

    checkMaxRecentsBuilders(maxBuildersVar) {
        const maxBuilderForm = this.getItem("Console", "changeLimit");
        return expect(maxBuilderForm.getAttribute('value')).toEqual(maxBuildersVar);
    }

    changeShowWorkerBuilders(showWorkerBuildersVar) {
        const showWorkerBuildersForm = this.getItem("Workers", "showWorkerBuilders");
        return showWorkerBuildersForm.isSelected().then(function(checked) {
            if (checked !== showWorkerBuildersVar) { return showWorkerBuildersForm.click(); }
        });
    }

    checkShowWorkerBuilders(showWorkerBuildersVar) {
        const showWorkerBuildersForm = this.getItem("Workers", "showWorkerBuilders");
        return expect(showWorkerBuildersForm.isSelected()).toEqual(showWorkerBuildersVar);
    }
}

module.exports = SettingsPage;
