import { 
  Document, 
  Paragraph, 
  TextRun, 
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  HeadingLevel,
  Media,
  HorizontalPositionRelativeFrom,
  VerticalPositionRelativeFrom,
  HorizontalPositionAlign,
  VerticalPositionAlign,
  TextWrappingType,
} from 'docx';

const generateSkillsTable = (skills, tableCellProperties) => {
  const children = [];
  const rows = [];
  const skillNames = {
    languages: 'Languages',
    databases: 'Databases',
    backendFrameworks: 'Backend Frameworks',
    frontendFrameworks: 'Frontend Frameworks',
    operationsAndInfrastructure: 'Operations & Infrastructure',
    integrationAndDeployment: 'Continuous Integration & Deployment',
    testing: 'Testing',
    thirdParty: 'Third-Party Integrations',
    agile: 'Agile',
    other: 'Other',
  };


  Object.keys(skills).forEach((skill) => {
    if (skills[skill].length === 0) {
      return;
    }

    rows.push(new TableRow({
      children: [
        new TableCell({
          ...tableCellProperties,
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${skillNames[skill]}`,
                }),
              ],
              style: 'tableHeader',
            })
          ],
        }),
        new TableCell({
          ...tableCellProperties,
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: Array.isArray(skills[skill])
                    ? `${skills[skill].join(', ')}`
                    : `${skills[skill]}`,
                }),
              ],
              style: 'tableData',
            }),
          ],
        }),
      ],
    }));
  });

  if (rows.length === 0) {
    return [];
  }

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `skills`,
          color: '#0098f7',
          allCaps: true,
          bold: true,
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      thematicBreak: false,
      style: 'headerText',
    }),
    new Paragraph({}),
    new Table({ rows }),
  );
  
  return children;
};
const generateLanguagesTable = (spokenLanguages, tableCellProperties) => {
  if (spokenLanguages.length === 0) {
    return [];
  }
  
  const children = [];

  const rows = spokenLanguages.map((obj) => (
    new TableRow({
      children: [
        new TableCell({
          ...tableCellProperties,
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${obj.language} (${obj.level})`,
                }),
              ],
              style: 'tableHeader',
            })
          ],
        }),
      ],
    })
  ));

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `languages`,
          color: '#0098f7',
          allCaps: true,
          bold: true,
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      thematicBreak: false,
      style: 'headerText',
    }),
    new Paragraph({}),
    new Table({ rows }),
  );

  return children;
};
const generateProjectTableRow = (
  title, 
  data, 
  tableCellProperties, 
  dataIsBold
) => (
  new TableRow({
    children: [
      new TableCell({
        ...tableCellProperties,
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${title}`,
              }),
            ],
            style: 'tableHeader',
          })
        ],
      }),
      new TableCell({
        ...tableCellProperties,
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: Array.isArray(data)
                  ? `${data.join(', ')}`
                  : `${data}`,
                bold: dataIsBold,
              }),
            ],
            style: 'tableData',
          })
        ],
      }),
    ],
  })
);
const generateProjectTables = (projects, tableCellProperties) => {
  if (projects.length === 0) {
    return [];
  }

  const children = [];

  projects.forEach((project) => {
    delete project._id;

    const rows = [];

    if (project.period) {
      let startDate = new Date(project.period.startDate);
      startDate = `${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
      
      let endDate = `Present`;

      if (project?.period?.endDate) {
        endDate = new Date(project.period.endDate);
        endDate = `${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
      }

      rows.push(generateProjectTableRow(
        `Period`, 
        `${startDate} - ${endDate}`, 
        tableCellProperties, 
        true,
      ));
    }

    if (project.client) {
      rows.push(generateProjectTableRow(
        `Client`, 
        project.client, 
        tableCellProperties, 
        true,
      ));
    }

    if (project.position) {
      rows.push(generateProjectTableRow(
        `Position`, 
        project.position, 
        tableCellProperties,
      ));
    }

    if (project.technologies) {
      rows.push(generateProjectTableRow(
        `Technologies`, 
        project.technologies, 
        tableCellProperties, 
      ));
    }

    if (project.responsibilities) {
      rows.push(generateProjectTableRow(
        `Responsibilities`, 
        project.responsibilities, 
        tableCellProperties, 
      ));
    }

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `projects`,
            color: '#0098f7',
            allCaps: true,
            bold: true,
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        thematicBreak: false,
        style: 'headerText',
      }),
      new Paragraph({}), 
      new Table({ rows }),
    );
  });

  return children;
};
const generateEducation = (education) => {
  if (education.length === 0) {
    return [];
  }

  const children = [];

  const monthNames = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June",
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
  ];

  education.forEach((item) => {
    let startDate = new Date(item.period.startDate);
    startDate = `${monthNames[startDate.getMonth()]} ${startDate.getFullYear()}`;
    
    let endDate = ` - Present`;

    if (item?.period?.endDate) {
      endDate = new Date(item.period.endDate);
      endDate = ` - ${monthNames[endDate.getMonth()]} ${endDate.getFullYear()}`;
    }

    const qualifications = [];
    
    if (item.qualifications) {
      item.qualifications.forEach((qualification) => {
        qualifications.push(
          new TextRun({
            text: `- ${qualification} `,
            italics: true,
            color: '#666666',
          }),
        );
      });
    }

    children.push(
      new Paragraph({}),
      new Paragraph({
        children: [
          new TextRun({
            text: `${item.institution}`,
            bold: true,
          }),
          ...qualifications,
        ],
        style: 'bodyText',
      }),
    );

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `education`,
            color: '#0098f7',
            allCaps: true,
            bold: true,
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        thematicBreak: false,
        style: 'headerText',
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${startDate}${endDate}`,
          }),
        ],
        style: 'dateText',
        break: true,
      }),
    );
  });

  return children;
};

const generateDocx = (data, image) => {
  delete data.skills.id;

  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: 'titleText',
          name: 'Title Text',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            size: 80,
            font: 'Sana',
          },
        },
        {
          id: 'subTitleText',
          name: 'Subtitle Text',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            size: 48,
            font: 'Sana',
          },
        },
        {
          id: 'headerText1',
          name: 'Header Text 1',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            size: 36,
            font: 'Sana',
          },
        },
        {
          id: 'bodyText',
          name: 'Body Text',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            size: 28,
            font: 'Sana',
          },
        },
        {
          id: 'tableHeader',
          name: 'Table Header',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            size: 28,
            font: 'Sana',
            italics: true,
          },
        },
        {
          id: 'tableData',
          name: 'Table Data',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            size: 28,
            font: 'Sana',
            italics: false,
          },
        },
        {
          id: 'qualifications',
          name: 'Qualifications',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            size: 28,
            font: 'Sana',
            italics: true,
            color: '#666666',
          },
        },
        {
          id: 'dateText',
          name: 'Date Text',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: {
            size: 28,
            font: 'Sana',
            italics: false,
            color: '#666666',
          },
        },
      ],
    },
  });

  const profileImage = Media.addImage(doc, image, 125, 125, {
    floating: {
      horizontalPosition: {
        relative: HorizontalPositionRelativeFrom.COLUMN,
        align: HorizontalPositionAlign.RIGHT,
      },
      verticalPosition: {
        relative: VerticalPositionRelativeFrom.PARAGRAPH,
        align: VerticalPositionAlign.TOP,
      },
    },
    wrap: {
      type: TextWrappingType.NONE,
    },
  });

  const tableCellProperties = {
    margins: {
      top: 100,
      bottom: 100,
      left: 100,
      right: 100,
    },
    borders: {
      top: {
        style: BorderStyle.DASHED,
        color: '#dadce0',
      },
      bottom: {
        style: BorderStyle.DASHED,
        color: '#dadce0',
      },
      left: {
        style: BorderStyle.DASHED,
        color: '#dadce0',
      },
      right: {
        style: BorderStyle.DASHED,
        color: '#dadce0',
      },
    },
    width: {
      type: WidthType.PERCENTAGE,
      size: 100,
    },
  };

  doc.addSection({
    properties: {},
    children: [
      new Paragraph({
        children: [
          profileImage,
          new TextRun({
            text: `${data.firstName} ${data.lastName}`,
            color: '#353744',
          }),
        ],
        heading: HeadingLevel.TITLE,
        style: 'titleText',
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `${data.role}`,
            color: '#0098f7',
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        thematicBreak: false,
        style: 'subTitleText',
      }),
      new Paragraph({}),
      new Paragraph({}),
      new Paragraph({}),
      new Paragraph({
        children: [
          new TextRun({
            text: `summary`,
            color: '#0098f7',
            allCaps: true,
            bold: true,
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        thematicBreak: false,
        style: 'headerText',
      }),
      new Paragraph({}),
      new Paragraph({
        children: [
          new TextRun({
            text: `${data.summary}`,
          }),
        ],
        style: 'bodyText',
      }),
      new Paragraph({}),
      new Paragraph({}),
      ...generateSkillsTable(data.skills, tableCellProperties),
      new Paragraph({}),
      new Paragraph({}),
      ...generateLanguagesTable(data.spokenLanguages, tableCellProperties),
      new Paragraph({}),
      new Paragraph({}),
      ...generateProjectTables(data.projects, tableCellProperties),
      new Paragraph({}),
      new Paragraph({}),
      ...generateEducation(data.education),
    ],
  });

  return doc;
};

export default generateDocx;