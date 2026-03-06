/**
 * Test cases for duration validator (Math.round approach)
 *
 * Logic being tested:
 *   const diffDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
 *   const diffMonths = Math.round(diffDays / 30);   // NO || 1
 *   if (diffMonths !== durationMonths) → ERROR
 *
 * Run with:  node durationValidatorTest.js
 */

// ─── Inline the exact logic from your validator / controller ────────────────
const computeDuration = (startDate, endDate) => {
    const diffDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    return Math.round(diffDays / 30); // NO || 1
};

// ─── Tiny test runner (no dependencies) ─────────────────────────────────────
let passed = 0;
let failed = 0;

const test = (description, start, end, submittedDuration, shouldPass) => {
    const computed = computeDuration(start, end);
    const validatorWouldPass = computed === submittedDuration;
    const ok = validatorWouldPass === shouldPass;

    if (ok) {
        passed++;
        console.log(`  ✅  ${description}`);
        console.log(`       ${start} → ${end} | days=${Math.round((new Date(end)-new Date(start))/(1000*60*60*24))} | computed=${computed} | submitted=${submittedDuration}`);
    } else {
        failed++;
        console.log(`  ❌  ${description}`);
        console.log(`       ${start} → ${end} | days=${Math.round((new Date(end)-new Date(start))/(1000*60*60*24))} | computed=${computed} | submitted=${submittedDuration}`);
        console.log(`       Expected validator to ${shouldPass ? "PASS" : "FAIL"} but it ${validatorWouldPass ? "PASSED" : "FAILED"}`);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 1 — EXACT / CLEAN MONTH BOUNDARIES  (should PASS)
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n📦 GROUP 1 — Exact month boundaries (should PASS)");

test("Exactly 1 month (31-day month)",        "2024-01-01", "2024-02-01",  1, true);
test("Exactly 1 month (28-day Feb)",           "2024-02-01", "2024-03-01",  1, true);
test("Exactly 1 month (leap Feb)",             "2024-02-01", "2024-03-01",  1, true);
test("Exactly 2 months",                       "2024-01-01", "2024-03-01",  2, true);
test("Exactly 3 months",                       "2024-01-01", "2024-04-01",  3, true);
test("Exactly 4 months",                       "2024-01-01", "2024-05-01",  4, true);
test("Exactly 5 months",                       "2024-01-01", "2024-06-01",  5, true);
test("Exactly 6 months",                       "2024-01-01", "2024-07-01",  6, true);

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 2 — MID-MONTH START  (should PASS)
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n📦 GROUP 2 — Mid-month start (should PASS)");

test("Mid-month, 1 month (Jan 15 → Feb 15)",   "2024-01-15", "2024-02-15",  1, true);
test("Mid-month, 2 months (Jan 15 → Mar 15)",  "2024-01-15", "2024-03-15",  2, true);
test("Mid-month, 6 months (Jan 15 → Jul 15)",  "2024-01-15", "2024-07-15",  6, true);
test("Mid-month, 3 months (Mar 10 → Jun 10)",  "2024-03-10", "2024-06-10",  3, true);

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 3 — ROUNDING TOLERANCE  (should PASS — within ±15 days of boundary)
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n📦 GROUP 3 — Rounding tolerance ±15 days (should PASS)");

test("1 month + 13 days → rounds to 1",        "2024-01-01", "2024-02-14",  1, true);
test("1 month - 1 day → rounds to 1",          "2024-01-15", "2024-02-14",  1, true);  // 30 days
test("Jan 1 → Feb 28 (58 days) → rounds to 2", "2024-01-01", "2024-02-28",  2, true);  // 58/30=1.93 → 2
test("5 months - 1 day → rounds to 5",         "2024-01-15", "2024-06-14",  5, true);  // 150 days → 5
test("6 months - 1 day → rounds to 6",         "2024-01-15", "2024-07-14",  6, true);  // 180 days → 6
test("Month-end: Jan 31 → Mar 31 → 2 months",  "2024-01-31", "2024-03-31",  2, true);  // 60 days → 2
test("Month-end: Jan 31 → Apr 30 → 3 months",  "2024-01-31", "2024-04-30",  3, true);  // 89 days → 3
test("Crosses year: Nov 30 → May 30 → 6mo",    "2024-11-30", "2025-05-30",  6, true);  // 182 days → 6
test("Crosses year: Oct 1 → Apr 1 → 6mo",      "2024-10-01", "2025-04-01",  6, true);  // 182 days → 6
test("Leap year Feb: Feb 1 → Mar 1 → 1mo",     "2024-02-01", "2024-03-01",  1, true);  // 29 days → 1
test("Leap year: Feb 29 → Mar 29 → 1mo",       "2024-02-29", "2024-03-29",  1, true);  // 29 days → 1

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 4 — WRONG DURATION SUBMITTED  (should FAIL)
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n📦 GROUP 4 — Wrong duration submitted (should FAIL)");

test("1 month range but said 2",               "2024-01-01", "2024-02-01",  2, false);
test("2 month range but said 1",               "2024-01-01", "2024-03-01",  1, false);
test("2 month range but said 3",               "2024-01-01", "2024-03-01",  3, false);
test("6 month range but said 5",               "2024-01-01", "2024-07-01",  5, false);
test("6 month range but said 0",               "2024-01-01", "2024-07-01",  0, false);
test("3 month range but said 6",               "2024-01-01", "2024-04-01",  6, false);
test("1 month range but said 0",               "2024-01-15", "2024-02-15",  0, false);

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 5 — TOO SHORT (< 15 days, rounds to 0)  (should FAIL when submitted=1)
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n📦 GROUP 5 — Too short, rounds to 0 (should FAIL)");

test("Only 9 days, said 1",                    "2024-01-01", "2024-01-10",  1, false);
test("Only 14 days, said 1",                   "2024-01-01", "2024-01-15",  1, false);
test("Only 1 day, said 1",                     "2024-01-01", "2024-01-02",  1, false);

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 6 — OVER 6 MONTHS  (should FAIL — durationMonths max=6 caught by Joi,
//            but also the computed value won't match if they somehow submit 6)
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n📦 GROUP 6 — Over 6 months range (should FAIL)");

test("7 month range, said 7",                  "2024-01-01", "2024-08-01",  7, false);  // Joi max=6 blocks 7
test("7 month range, said 6",                  "2024-01-01", "2024-08-01",  6, false);  // 212 days → rounds to 7, mismatch

// ─────────────────────────────────────────────────────────────────────────────
// GROUP 7 — EDGE: exactly at rounding boundary (14/15 days = tipping point)
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n📦 GROUP 7 — Rounding boundary edge cases");

test("14 days → rounds to 0, said 0 (PASS)",   "2024-01-01", "2024-01-15",  0, true);   // 14/30=0.46 → 0
test("15 days → rounds to 1, said 1 (PASS)",   "2024-01-01", "2024-01-16",  1, true);   // 15/30=0.50 → 1
test("14 days, said 1 (FAIL)",                 "2024-01-01", "2024-01-15",  1, false);
test("15 days, said 0 (FAIL)",                 "2024-01-01", "2024-01-16",  0, false);
test("44 days → rounds to 1, said 1 (PASS)",   "2024-01-01", "2024-02-14",  1, true);   // 44/30=1.46 → 1
test("45 days → rounds to 2, said 2 (PASS)",   "2024-01-01", "2024-02-15",  2, true);   // 45/30=1.50 → 2
test("44 days, said 2 (FAIL)",                 "2024-01-01", "2024-02-14",  2, false);
test("45 days, said 1 (FAIL)",                 "2024-01-01", "2024-02-15",  1, false);

// ─────────────────────────────────────────────────────────────────────────────
// SUMMARY
// ─────────────────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(60)}`);
console.log(`  Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests`);
if (failed === 0) {
    console.log("  🎉 All tests passed!");
} else {
    console.log("  ⚠️  Some tests failed — review the logic above.");
}
console.log(`${"─".repeat(60)}\n`);