/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// coffee script
// test goal: checks the capability to navigate in a dedicated build
// to use previous and next link


const forcePage = require('./pages/force.coffee');
const builderPage = require('./pages/builder.coffee');
const homePage = require('./pages/home.coffee');

describe('previousnextlink', function() {
    let force = null;
    let builder = null;

    beforeEach(function() {
        builder = new builderPage('runtests', 'force');
        return force =  new forcePage();
    });
    afterEach(() => new homePage().waitAllBuildsFinished());

    it('has afterEach working', function() {
    });

    return it('should navigate in the builds history by using the previous next links', function() {
        builder.go();
        return builder.getLastSuccessBuildNumber().then(function(lastbuild) {
            // Build #1
            builder.goForce();
            force.getStartButton().click();
            builder.go();
            builder.waitNextBuildFinished(lastbuild);
            // Build #2
            builder.goForce();
            force.getStartButton().click();
            builder.go();
            builder.waitNextBuildFinished(+lastbuild + 1);
            builder.goBuild(+lastbuild + 2);
            const lastBuildURL = browser.getCurrentUrl();
            builder.clickWhenClickable(builder.getPreviousButton());
            expect(browser.getCurrentUrl()).not.toMatch(lastBuildURL);
            builder.clickWhenClickable(builder.getNextButton());
            return expect(browser.getCurrentUrl()).toMatch(lastBuildURL);
        });
    });
});

describe('forceandstop', function() {
    let force = null;
    let builder = null;

    beforeEach(function() {
        builder = new builderPage('slowruntests', 'force');
        return force =  new forcePage();
    });

    return it('should create a build with a dedicated reason and stop it during execution', function() {

        builder.goForce();
        force.getStartButton().click();
        expect(browser.getCurrentUrl()).toMatch("/builders/\[1-9]/builds/\[1-9]");
        return builder.getStopButton().click();
    });
});
