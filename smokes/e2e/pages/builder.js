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

class BuilderPage extends BasePage {
    constructor(builder, forcename) {
        {
          // Hack: trick Babel/TypeScript into allowing this before super.
          if (false) { super(); }
          let thisFn = (() => { return this; }).toString();
          let thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim();
          eval(`${thisName} = this;`);
        }
        this.builder = builder;
        this.forceName=forcename;
    }

    goDefault() {
        return browser.get('#/builders');
    }

    go() {
        browser.get('#/builders');
        const localBuilder = element.all(By.linkText(this.builder));
        return localBuilder.click();
    }

    goForce() {
        this.go();
        return element.all(By.buttonText(this.forceName)).first().click();
    }

    goBuild(buildRef) {
        this.go();
        return element.all(By.linkText(buildRef.toString())).click();
    }

    getLastSuccessBuildNumber() {
        return element.all(By.css('span.badge-status.results_SUCCESS')).then(function(elements){
            if (elements.length === 0) {
                return 0;
            }
            return elements[0].getText().then(numberstr => +numberstr);
        });
    }

    waitNextBuildFinished(reference) {
        const self = this;
        const buildCountIncrement = () =>
            self.getLastSuccessBuildNumber().then(currentBuildCount => currentBuildCount === (reference + 1))
        ;
        return browser.wait(buildCountIncrement, 20000);
    }

    waitGoToBuild(expected_buildnumber) {
        const isInBuild = () =>
            browser.getCurrentUrl().then(function(buildUrl) {
                const split = buildUrl.split("/");
                const builds_part = split[split.length-2];
                const number = +split[split.length-1];
                if (builds_part !== "builds") {
                    return false;
                }
                if (number !== expected_buildnumber) {
                    return false;
                }
                return true;
            })
        ;
        return browser.wait(isInBuild, 20000);
    }

    getStopButton() {
        return element(By.buttonText('Stop'));
    }

    getPreviousButton() {
        return element(By.partialLinkText('Previous'));
    }

    getNextButton() {
        return element(By.partialLinkText('Next'));
    }

    getRebuildButton() {
        return element(By.buttonText('Rebuild'));
    }

    checkBuilderURL() {
        const builderLink = element.all(By.linkText(this.builder));
        return expect(builderLink.count()).toBeGreaterThan(0);
    }
}

module.exports = BuilderPage;
