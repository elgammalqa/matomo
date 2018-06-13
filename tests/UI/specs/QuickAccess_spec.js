/*!
 * Piwik - free/libre analytics platform
 *
 * ActionsDataTable screenshot tests.
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

describe("QuickAccess", function () {
    const selectorToCapture = ".quick-access,.quick-access .dropdown";
    const url = "?module=CoreHome&action=index&idSite=1&period=year&date=2012-08-09";

    async function enterSearchTerm(searchTermToAdd) {
        await page.focus(".quick-access input");
        await page.keys.type(searchTermToAdd);
        await page.waitForNetworkIdle();
    }

    it("should be displayed", async function () {
        await page.goto(url);
        expect(await page.screenshotSelector(selectorToCapture)).to.matchImage('initially');
    });

    it("should search for something and update view", async function () {
        await enterSearchTerm('s');
        expect(await page.screenshotSelector(selectorToCapture)).to.matchImage('search_1');
    });

    it("should search again when typing another letter", async function () {
        await enterSearchTerm(page, 'a');
        expect(await page.screenshotSelector(selectorToCapture)).to.matchImage('search_2');
    });

    it("should show message if no results", async function () {
        await enterSearchTerm(page, 'alaskdjfs');
        expect(await page.screenshotSelector(selectorToCapture)).to.matchImage('search_no_result');
    });

    it("should be possible to activate via shortcut", async function () {
        await page.goto(url);
        await page.focus('body');
        await page.keys.type('f');
        expect(await page.screenshotSelector(selectorToCapture)).to.matchImage('shortcut');
    });

    it("should search for websites", async function () {
        await enterSearchTerm('si');
        expect(await page.screenshotSelector(selectorToCapture)).to.matchImage('search_sites');
    });

    it("clicking on a category should show all items that belong to that category", async function () {
        const element = await page.jQuery('.quick-access-category:first');
        await element.click();
        expect(await page.screenshotSelector(selectorToCapture)).to.matchImage('search_category');
    });
});
