/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// coffee script
// test goal: checks the capability to define a reason and to cancel/start the build

const homePage = require('./pages/home.coffee');
const forcePage = require('./pages/force.coffee');
const builderPage = require('./pages/builder.coffee');

describe('force and cancel', function() {
    let force = null;
    let builder = null;

    beforeEach(function() {
        builder = new builderPage('runtests', 'force');
        force =  new forcePage();
        return builder.goDefault();
    });

    afterEach(() => new homePage().waitAllBuildsFinished());

    it('should create a build', function() {
        builder.go();
        return builder.getLastSuccessBuildNumber().then(function(lastbuild) {
            builder.goForce();
            force.getStartButton().click();
            builder.go();
            return builder.waitNextBuildFinished(lastbuild);
        });
    });

    it('should create a build with a dedicated reason and cancel it', function() {

        builder.go();
        builder.goForce();
        return force.getCancelButton().click();
    });

    return it('should create a build with a dedicated reason and Start it', function() {

        builder.go();
        builder.goForce();
        force.setReason("New Test Reason");
        force.setYourName("FaceLess User");
        force.setProjectName("BBOT9");
        force.setBranchName("Gerrit Branch");
        force.setRepo("http//name.com");
        force.setRevisionName("12345");
        return force.getStartButton().click();
    });
});
