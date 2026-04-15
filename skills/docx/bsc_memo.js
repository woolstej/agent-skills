const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, LevelFormat, TabStopType,
  TabStopPosition
} = require("docx");
const fs = require("fs");

const OUT = "y:/Long Island/AA/B/Boston Scientific/2026/Working Data/BSC 2026 AAP - Data Processing Technical Memo.docx";

// ── Shared styles ─────────────────────────────────────────────────────────────
const BLUE   = "1F4E79";
const LBLUE  = "D6E4F0";
const LGREY  = "F2F2F2";
const WHITE  = "FFFFFF";
const BLACK  = "000000";

const cellBorder = { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" };
const borders    = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function hdrCell(text, w) {
  return new TableCell({
    borders, width: { size: w, type: WidthType.DXA },
    shading: { fill: BLUE, type: ShadingType.CLEAR },
    margins: cellMargins, verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      children: [new TextRun({ text, bold: true, color: WHITE, font: "Arial", size: 20 })]
    })]
  });
}

function dataCell(text, w, shade) {
  return new TableCell({
    borders, width: { size: w, type: WidthType.DXA },
    shading: { fill: shade || WHITE, type: ShadingType.CLEAR },
    margins: cellMargins, verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      children: [new TextRun({ text: String(text), font: "Arial", size: 20 })]
    })]
  });
}

function boldDataCell(text, w, shade) {
  return new TableCell({
    borders, width: { size: w, type: WidthType.DXA },
    shading: { fill: shade || WHITE, type: ShadingType.CLEAR },
    margins: cellMargins, verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      children: [new TextRun({ text: String(text), bold: true, font: "Arial", size: 20 })]
    })]
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 320, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 6 } },
    children: [new TextRun({ text, font: "Arial", size: 32, bold: true, color: BLUE })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, font: "Arial", size: 26, bold: true, color: BLUE })]
  });
}

function body(text) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 22 })]
  });
}

function bodyBold(text) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 22, bold: true })]
  });
}

function bullet(text, bold) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, font: "Arial", size: 22, bold: bold || false })]
  });
}

function subbullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 1 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, font: "Arial", size: 20 })]
  });
}

function spacer(n) {
  const ps = [];
  for (let i = 0; i < (n || 1); i++) {
    ps.push(new Paragraph({ children: [new TextRun({ text: "", size: 20 })] }));
  }
  return ps;
}

function note(text) {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    indent: { left: 720 },
    border: { left: { style: BorderStyle.SINGLE, size: 12, color: BLUE, space: 8 } },
    children: [new TextRun({ text, font: "Arial", size: 20, italics: true, color: "444444" })]
  });
}

// ── TABLES ────────────────────────────────────────────────────────────────────

// Table 1: Source files
const sourceFilesTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [3500, 3060, 2800],
  rows: [
    new TableRow({ children: [hdrCell("File Name", 3500), hdrCell("Contents", 3060), hdrCell("Rows / Notes", 2800)] }),
    new TableRow({ children: [dataCell("JacksonLewis2025Process-Alljobinfochanges_US-PR.xlsx", 3500), dataCell("All 2025 US + PR job change events", 3060), dataCell("106,473 rows", 2800, LGREY)] }),
    new TableRow({ children: [dataCell("JacksonLewis2025Process-NewHires_2025.xlsx", 3500), dataCell("US New Hires 2025 and PR New Hires 2025 sheets", 3060), dataCell("5,345 US + 170 PR rows", 2800)] }),
    new TableRow({ children: [dataCell("2025JobCodeswithEEOCategories-9Feb2026.xlsx", 3500), dataCell("Job code to EEO-1 category crosswalk", 3060), dataCell("10,635 rows", 2800, LGREY)] }),
    new TableRow({ children: [dataCell("20260206 - Boston Scientific 2026 AAP & Government Reporting Payroll Request.xlsx", 3500), dataCell("Earnings and hours worked (2-row header format)", 3060), dataCell("29,231 Earnings / 27,169 Hours rows", 2800)] }),
  ]
});

// Table 2: Snapshot headcount comparison
const snapshotTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [4680, 2340, 2340],
  rows: [
    new TableRow({ children: [hdrCell("Metric", 4680), hdrCell("Before Fix", 2340), hdrCell("After Fix", 2340)] }),
    new TableRow({ children: [dataCell("BOY headcount", 4680), dataCell("3,102", 2340, LGREY), boldDataCell("23,369", 2340, LGREY)] }),
    new TableRow({ children: [dataCell("EOY headcount", 4680), dataCell("31,880", 2340), dataCell("31,880", 2340)] }),
    new TableRow({ children: [dataCell("EOY - BOY delta", 4680), boldDataCell("28,778", 2340, LGREY), boldDataCell("8,511", 2340, LGREY)] }),
  ]
});

// Table 3: BOY anchor validation
const validationTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [5200, 2080, 2080],
  rows: [
    new TableRow({ children: [hdrCell("Validation Check", 5200), hdrCell("Result", 2080), hdrCell("Status", 2080)] }),
    new TableRow({ children: [dataCell("Person IDs in Second Pass EOY but NOT in Final SNP", 5200, LGREY), dataCell("0", 2080, LGREY), boldDataCell("PASS", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Person IDs in Final SNP but NOT in Second Pass EOY", 5200), dataCell("0", 2080), boldDataCell("PASS", 2080)] }),
    new TableRow({ children: [dataCell("Duplicate Person IDs within Second Pass EOY", 5200, LGREY), dataCell("0", 2080, LGREY), boldDataCell("PASS", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Duplicate Person IDs within Final SNP", 5200), dataCell("0", 2080), boldDataCell("PASS", 2080)] }),
    new TableRow({ children: [dataCell("US EOY records included in anchor", 5200, LGREY), dataCell("21,578", 2080, LGREY), dataCell("", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("PR EOY records included in anchor", 5200), dataCell("1,791", 2080), dataCell("", 2080)] }),
    new TableRow({ children: [boldDataCell("Final BOY anchor total", 5200, LBLUE), boldDataCell("23,369", 2080, LBLUE), boldDataCell("WRITTEN", 2080, LBLUE)] }),
  ]
});

// Table 4: Gap summary
const gapSummaryTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [6360, 3000],
  rows: [
    new TableRow({ children: [hdrCell("Population", 6360), hdrCell("Count", 3000)] }),
    new TableRow({ children: [dataCell("EOY employees", 6360), dataCell("31,880", 3000)] }),
    new TableRow({ children: [dataCell("BOY employees (anchor file)", 6360), dataCell("23,369", 3000, LGREY)] }),
    new TableRow({ children: [dataCell("In EOY but not BOY", 6360), boldDataCell("10,900", 3000)] }),
    new TableRow({ children: [dataCell("  Of those: captured in new_hires sheet (recognized hire event reasons)", 6360), dataCell("4,728", 3000, LGREY)] }),
    new TableRow({ children: [boldDataCell("  UNACCOUNTED GAP", 6360, LBLUE), boldDataCell("6,172", 3000, LBLUE)] }),
  ]
});

// Table 5: employee class breakdown
const empClassTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [5200, 2080, 2080],
  rows: [
    new TableRow({ children: [hdrCell("Employee Class", 5200), hdrCell("Count", 2080), hdrCell("Typical AAP Coverage", 2080)] }),
    new TableRow({ children: [dataCell("Agency/Temp", 5200), dataCell("3,113", 2080, LGREY), dataCell("Excluded", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Employee of Vendor", 5200), dataCell("1,524", 2080), dataCell("Excluded", 2080)] }),
    new TableRow({ children: [dataCell("Consultant", 5200), dataCell("1,051", 2080, LGREY), dataCell("Excluded", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Independent Contractor", 5200), dataCell("86", 2080), dataCell("Excluded", 2080)] }),
    new TableRow({ children: [dataCell("Contingent Worker Intern", 5200), dataCell("3", 2080, LGREY), dataCell("Excluded", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Distributor", 5200), dataCell("1", 2080), dataCell("Excluded", 2080)] }),
    new TableRow({ children: [boldDataCell("Employee", 5200), boldDataCell("345", 2080, LGREY), dataCell("Included - requires review", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Int'l Expatriate", 5200), dataCell("25", 2080), dataCell("Typically included - confirm", 2080)] }),
    new TableRow({ children: [dataCell("Board of Director", 5200), dataCell("23", 2080, LGREY), dataCell("EEO-1 Officers category - confirm", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Defined Term EE", 5200), dataCell("1", 2080), dataCell("Typically included - confirm", 2080)] }),
    new TableRow({ children: [boldDataCell("TOTAL GAP", 5200, LBLUE), boldDataCell("6,172", 2080, LBLUE), dataCell("", 2080, LBLUE)] }),
  ]
});

// Table 6: Event reason breakdown
const eventReasonTable = new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [5200, 2080, 2080],
  rows: [
    new TableRow({ children: [hdrCell("Event Reason (Most Recent Record)", 5200), hdrCell("Count", 2080), hdrCell("Notes", 2080)] }),
    new TableRow({ children: [dataCell("Other Data Change", 5200), dataCell("3,627", 2080, LGREY), dataCell("Admin record touch - not a hire", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Cost Center Change", 5200), dataCell("1,078", 2080), dataCell("Admin reassignment - not a hire", 2080)] }),
    new TableRow({ children: [dataCell("Supervisor Change", 5200), dataCell("1,014", 2080, LGREY), dataCell("Admin change - not a hire", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Shift Change", 5200), dataCell("130", 2080), dataCell("Schedule change", 2080)] }),
    new TableRow({ children: [dataCell("Transfer Location", 5200), dataCell("100", 2080, LGREY), dataCell("Already in transfer_list", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Job Title Change", 5200), dataCell("77", 2080), dataCell("Title-only change", 2080)] }),
    new TableRow({ children: [dataCell("Job Code Change - Lateral", 5200), dataCell("31", 2080, LGREY), dataCell("Already in transfer_list", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Employee Class Change", 5200), dataCell("29", 2080), dataCell("May indicate contingent-to-regular conversion", 2080)] }),
    new TableRow({ children: [dataCell("Add Global Assignment - Short Term", 5200), dataCell("21", 2080, LGREY), dataCell("International assignment", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Org Attribute Change", 5200), dataCell("15", 2080), dataCell("Admin - not a hire", 2080)] }),
    new TableRow({ children: [dataCell("Leave of Absence / Return From Leave", 5200), dataCell("22", 2080, LGREY), dataCell("LOA events", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Standard Hours Change / WorkFlex Change", 5200), dataCell("8", 2080), dataCell("Schedule adjustments", 2080)] }),
    new TableRow({ children: [dataCell("Transfer Company (Legal Entity)", 5200), dataCell("4", 2080, LGREY), dataCell("Cross-entity transfer - review for AAP coverage", 2080, LGREY)] }),
    new TableRow({ children: [dataCell("Promotion / Demotion (various)", 5200), dataCell("3", 2080), dataCell("In EOY but absent from BOY - data gap?", 2080)] }),
    new TableRow({ children: [dataCell("Full/Part Time Change, FMLA, Pay Changes", 5200), dataCell("9", 2080, LGREY), dataCell("Misc admin events", 2080, LGREY)] }),
  ]
});

// ── DOCUMENT ──────────────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "\u25CF", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "\u25CB", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1080, hanging: 360 } } } },
        ]
      }
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: BLUE },
        paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: BLUE },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 4 } },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              new TextRun({ text: "PRIVILEGED AND CONFIDENTIAL", font: "Arial", size: 16, bold: true, color: BLUE }),
              new TextRun({ text: "\tBoston Scientific 2026 AAP \u2014 Data Processing Technical Memo", font: "Arial", size: 16, color: "666666" }),
            ]
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            border: { top: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 4 } },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              new TextRun({ text: "Prepared March 10, 2026", font: "Arial", size: 16, color: "666666" }),
              new TextRun({ text: "\tPage ", font: "Arial", size: 16, color: "666666" }),
              new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "666666" }),
              new TextRun({ text: " of ", font: "Arial", size: 16, color: "666666" }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Arial", size: 16, color: "666666" }),
            ]
          })
        ]
      })
    },
    children: [

      // ── TITLE BLOCK ─────────────────────────────────────────────────────────
      ...spacer(1),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: "BOSTON SCIENTIFIC", font: "Arial", size: 48, bold: true, color: BLUE })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: "2026 Affirmative Action Program", font: "Arial", size: 32, bold: true, color: BLACK })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: "Data Processing \u2014 Technical Memorandum", font: "Arial", size: 28, color: "444444" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 320 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 8 } },
        children: [new TextRun({ text: "Prepared: March 10, 2026  |  PRIVILEGED AND CONFIDENTIAL", font: "Arial", size: 20, italics: true, color: "666666" })]
      }),

      // ── MEMO HEADER TABLE ────────────────────────────────────────────────────
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1500, 7860],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders, width: { size: 1500, type: WidthType.DXA }, margins: cellMargins,
              shading: { fill: BLUE, type: ShadingType.CLEAR },
              children: [new Paragraph({ children: [new TextRun({ text: "TO", bold: true, color: WHITE, font: "Arial", size: 22 })] })] }),
            new TableCell({ borders, width: { size: 7860, type: WidthType.DXA }, margins: cellMargins,
              children: [new Paragraph({ children: [new TextRun({ text: "Supervising Attorney of Record", font: "Arial", size: 22 })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders, width: { size: 1500, type: WidthType.DXA }, margins: cellMargins,
              shading: { fill: BLUE, type: ShadingType.CLEAR },
              children: [new Paragraph({ children: [new TextRun({ text: "FROM", bold: true, color: WHITE, font: "Arial", size: 22 })] })] }),
            new TableCell({ borders, width: { size: 7860, type: WidthType.DXA }, margins: cellMargins,
              children: [new Paragraph({ children: [new TextRun({ text: "AAP Analytics Team", font: "Arial", size: 22 })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders, width: { size: 1500, type: WidthType.DXA }, margins: cellMargins,
              shading: { fill: BLUE, type: ShadingType.CLEAR },
              children: [new Paragraph({ children: [new TextRun({ text: "DATE", bold: true, color: WHITE, font: "Arial", size: 22 })] })] }),
            new TableCell({ borders, width: { size: 7860, type: WidthType.DXA }, margins: cellMargins,
              children: [new Paragraph({ children: [new TextRun({ text: "March 10, 2026", font: "Arial", size: 22 })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders, width: { size: 1500, type: WidthType.DXA }, margins: cellMargins,
              shading: { fill: BLUE, type: ShadingType.CLEAR },
              children: [new Paragraph({ children: [new TextRun({ text: "RE", bold: true, color: WHITE, font: "Arial", size: 22 })] })] }),
            new TableCell({ borders, width: { size: 7860, type: WidthType.DXA }, margins: cellMargins,
              children: [new Paragraph({ children: [new TextRun({ text: "2026 AAP Data Intake \u2014 Technical Findings and Open Questions Requiring Guidance", font: "Arial", size: 22 })] })] }),
          ]}),
        ]
      }),

      ...spacer(1),

      // ── SECTION 1: PURPOSE ───────────────────────────────────────────────────
      h1("1.  Purpose"),
      body("This memorandum documents the technical work performed during the 2026 AAP data intake process for Boston Scientific Corporation. It describes the source files received, issues identified and resolved, and a set of substantive questions that require attorney guidance before the data processing pipeline can be finalized and outputs used for AAP analysis."),
      body("This memo is shared under attorney-client privilege and the attorney work-product doctrine."),

      ...spacer(1),

      // ── SECTION 2: SOURCE FILES ──────────────────────────────────────────────
      h1("2.  Source Files Received from Client"),
      body("The following files were received from Boston Scientific and placed in the Originals folder. These files are treated as read-only and are never modified."),
      ...spacer(1),
      sourceFilesTable,
      ...spacer(1),
      note("The Payroll Request file uses a non-standard two-row header structure (row 1 = instruction banner, row 2 = actual column headers). The script accounts for this."),

      ...spacer(1),

      // ── SECTION 3: SCRIPT UPDATES ────────────────────────────────────────────
      h1("3.  Script Development and Issues Resolved"),
      body("The 2026 processing script was adapted from the 2025 notebook. Two defects in the original notebook logic were identified and corrected, and one new data source was integrated."),

      h2("3.1  Disability Client-Question Filter Bug"),
      body("In the original 2025 notebook and initial 2026 script, employees who answered 'I Don't Wish To Answer' to the disability self-identification question were not being routed to the client questions output file. The cause was a sequencing error: the disability status mapping (converting verbose responses to Y/N) ran before the filter that was meant to capture incomplete responses, leaving no unrecoded values to match."),
      bullet("Impact: The Disability tab in the client questions workbook was always empty, even when thousands of employees had not provided a usable disability response."),
      bullet("Fix: The filter capturing unresolved disability responses was moved to execute before the Y/N recode, matching the established pattern used for veteran status and ethnicity."),
      bullet("2026 result: 7,760 employees with 'I Don't Wish To Answer' are now correctly written to the client questions output."),

      h2("3.2  New Hire Supplement File Integration"),
      body("The 2026 Originals folder included a file not present in 2025: JacksonLewis2025Process-NewHires_2025.xlsx, containing two sheets (US New Hires 2025 and PR New Hires 2025). This file had not been incorporated into the processing script."),
      bullet("The script was updated to load both sheets, drop two extra columns present in the new hire file but absent from the main file, and stack the records into the core dataset before processing."),
      bullet("After deduplication, 5,489 net new rows were added. These records were not already present in the Alljobinfochanges file, confirming the supplement file contains employees who would have been missed entirely."),
      note("The two extra columns in the new hire file that are not in the main file are: (Job Code) Job Sub Family (Label) and (Job Code) Job Family (Picklist Label). These are dropped during the stack to align column structures."),

      ...spacer(1),

      // ── SECTION 4: BOY SNAPSHOT ──────────────────────────────────────────────
      h1("4.  Beginning-of-Year Snapshot: Challenge and Resolution"),

      h2("4.1  The Problem"),
      body("For AAP purposes, a beginning-of-year (BOY) snapshot captures the workforce as it stood on January 1, 2025. The script derives this snapshot by filtering the source data for records with an effective date on or before the plan year start date."),
      body("The 2026 source file (Alljobinfochanges_US-PR.xlsx) contains only 2025 transactions, with the earliest effective date being January 1, 2025 itself. Only 3,102 employees had records dated exactly on January 1st. The remaining approximately 28,000 employees who were already active at the start of the year had no qualifying record in the file."),
      bullet("BOY headcount before fix: 3,102 employees"),
      bullet("Actual expected BOY population: approximately 22,000-23,000 employees"),

      h2("4.2  Comparison to 2025 Process"),
      body("The 2025 source files (retained in the Code/references folder) covered the date range December 31, 2023 through December 31, 2024, containing anchor records for the entire workforce as of the plan year start. The 2026 delivery did not include equivalent prior-period anchor records."),

      h2("4.3  Resolution: BOY Anchor File from 2024 EOY"),
      body("Rather than returning to the client for a supplemental extract, the 2024 end-of-year snapshot produced by last year's process was used as the 2026 BOY anchor. This snapshot, contained in the Second_Pass_Intake_Process.xlsx file, represents the active workforce as of December 31, 2024 and was cross-validated against the final analyst-cleaned snapshot file (BOS SCI - 1.1.25 SNP.xlsx) before use."),
      body("The US population (21,578 employees) was supplemented with a PR population derived from the 2025 PR source file (1,791 employees). The combined anchor file was written to the Originals folder as BOY_Anchor_2025-01-01.xlsx."),

      h2("4.4  Validation Results"),
      body("The following checks were run to confirm the Second_Pass EOY and the final cleaned SNP file are in alignment before accepting the anchor:"),
      ...spacer(1),
      validationTable,
      ...spacer(1),
      body("The validation passed on all counts. The chain of custody from raw notebook output to analyst-reviewed final file is clean."),
      ...spacer(1),
      snapshotTable,
      ...spacer(1),

      // ── SECTION 5: GAP ANALYSIS ──────────────────────────────────────────────
      h1("5.  Remaining Gap Analysis: EOY vs. BOY Delta"),

      h2("5.1  Summary"),
      body("After applying the corrected BOY anchor, the EOY-to-BOY delta narrowed from 28,778 to 8,511. Of those 8,511 employees in EOY but not BOY, 4,728 are captured in the new_hires output sheet via recognized hire event reasons. This leaves 6,172 employees unaccounted for by the current logic."),
      ...spacer(1),
      gapSummaryTable,
      ...spacer(1),

      h2("5.2  Employee Class Analysis of the Gap"),
      body("The gap was analyzed by Employee Class using the most recent record for each of the 6,172 employees in core_df. The results show that 94% of the gap population consists of contingent workers who are not classified as regular Employees."),
      ...spacer(1),
      empClassTable,
      ...spacer(1),
      note("The 2025 AAP EOY snapshot contained 21,578 employees, none of whom appear to be contingent workers. This strongly suggests the 2025 process excluded contingent workers, and the 2026 script currently lacks a corresponding filter."),

      h2("5.3  Event Reason Analysis of the Gap"),
      body("Examining the most recent event reason for each of the 6,172 gap employees confirms that none have a recognized new hire event reason. Their transactions are primarily administrative record changes, not employment events."),
      ...spacer(1),
      eventReasonTable,
      ...spacer(1),
      body("The predominance of 'Other Data Change,' 'Supervisor Change,' and 'Cost Center Change' (totaling 5,719 of 6,172 records) is consistent with contingent worker records that receive periodic data maintenance without being hired in any formal sense."),

      ...spacer(1),

      // ── SECTION 6: OPEN QUESTIONS ────────────────────────────────────────────
      h1("6.  Open Questions Requiring Attorney Guidance"),
      body("The following questions must be resolved before the processing pipeline is finalized and outputs are used for AAP analysis. We respectfully request the supervising attorney's guidance on each."),

      h2("Question 1: Scope of AAP Coverage \u2014 Which Employee Classes Should Be Included?"),
      body("The gap analysis reveals that the source data includes contingent workers (Agency/Temp, Employee of Vendor, Consultant, Independent Contractor) who are not classified as regular Employees. The 2026 EOY snapshot currently includes all non-terminated individuals in the source data regardless of Employee Class."),
      bullet("Should the AAP population be limited to the 'Employee' class only?"),
      bullet("Should 'Int'l Expatriate' (25 employees) and 'Defined Term EE' (1 employee) also be included?"),
      bullet("Should 'Board of Director' (23 individuals) be included in the EEO-1 Officers/Managers category?"),
      bullet("Are there any Employee Classes that were included in the 2025 AAP that should carry forward?"),
      note("If the AAP covers only 'Employee' class individuals, a filter will be added to the EOY snapshot logic before outputs are finalized. This would reduce the EOY count from 31,880 to approximately 22,000-23,000, which is more consistent with the 2025 EOY population of 21,578."),

      h2("Question 2: The 345 Regular Employees in the Gap"),
      body("Of the 6,172 gap employees, 345 are classified as 'Employee' (regular employees). They appear in the 2026 EOY but were absent from the 2024 EOY used as the BOY anchor. Their most recent event reason is an administrative change (not a hire event), which means they are not captured in the new_hires output sheet."),
      bullet("Were these individuals employed by Boston Scientific on January 1, 2025?"),
      bullet("If so, were they omitted from last year's data due to a data quality issue, or were they in a population that was intentionally excluded from the 2025 AAP (e.g., a specific legal entity or location)?"),
      bullet("Should they be added to the BOY anchor retroactively, or treated as if they were new additions during 2025?"),
      note("A deeper drill-down on these 345 employees (examining their first 2025 event record rather than their most recent) may help clarify whether they had a hire event earlier in the year that is simply being masked by the 'most recent record' logic."),

      h2("Question 3: Transfer Company (Legal Entity) Event Reason"),
      body("Four employees in the gap have 'Transfer Company (Legal Entity)' as their most recent event reason. This event typically represents an employee moving from one BSC legal entity to another within the US."),
      bullet("Should these individuals be treated as new hires for AAP purposes in the receiving entity?"),
      bullet("Or should they be treated as existing employees with continuity of service?"),

      h2("Question 4: Employee Class Change"),
      body("Twenty-nine employees in the gap have 'Employee Class Change' as their most recent event reason. This could represent contingent workers who converted to regular employee status during 2025."),
      bullet("If an individual converted from contingent to 'Employee' during 2025, should they be treated as a new hire in the AAP?"),
      bullet("Or should their conversion date serve as their effective hire date for purposes of the BOY/EOY analysis?"),

      ...spacer(1),

      // ── SECTION 7: RECOMMENDED NEXT STEPS ───────────────────────────────────
      h1("7.  Recommended Next Steps"),
      body("Pending attorney guidance on the questions above, the following actions are ready to implement once direction is received:"),
      bullet("Add an Employee Class filter to the EOY snapshot logic to exclude contingent workers, consistent with prior year practice.", true),
      subbullet("Will reduce EOY to approximately 22,000-23,000 employees, narrowing the gap to the expected net hire/termination count."),
      bullet("Run a secondary drill-down on the 345 regular Employee-class gap individuals to examine their first (rather than most recent) 2025 record.", true),
      subbullet("This will determine whether they had a recognized hire event that is being masked by the idxmax logic."),
      bullet("Once employee class scope is confirmed, re-run both the BOY anchor generation script and the main processing script to produce final outputs.", true),
      bullet("Review the 29 'Employee Class Change' employees to determine whether their conversions should be coded as hire events.", true),

      ...spacer(2),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA", space: 8 } },
        spacing: { before: 240 },
        children: [new TextRun({ text: "This document is Privileged and Confidential \u2014 Prepared in Anticipation of Litigation", font: "Arial", size: 18, italics: true, color: "888888" })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUT, buf);
  console.log("Written: " + OUT);
}).catch(e => { console.error(e); process.exit(1); });
