import { environment } from "../../../environments/environment";

const devContents = {
  mcq: [
    { id: 'do_1135404628350730241108', name: 'MCQ Question Set 1', category: 'vertical' },
    { id: 'do_1135404675650273281117', name: 'MCQ Question Set 2', category: 'vertical' },
    { id: 'do_1135147715041853441338', name: 'Questionset AFL', category: 'vertical' },
    { id: 'do_113540307343040512182', name: 'Horizontal QuestionSet 1', category: 'horizontal' },
    { id: 'do_113540311371423744194', name: 'Grid Layout QuestionSet 1', category: 'grid' },
    { id: 'do_113455969933246464124', name: 'Test QuestionSet 2022', category: 'solutions' },
  ],
  sa: [
    { id: 'do_113540296505393152173', name: 'Subjective QS 1' },
    { id: 'do_1135404720490905601126', name: 'Subjective Questionset 1' },
  ]
};
const stagingContents = {
  mcq: [
    { id: 'do_213536668306825216155', name: 'MCQ Question Set 1', category: 'vertical' },
    { id: 'do_213536734487494656178', name: 'MCQ Question Set 2', category: 'vertical' },
    { id: 'do_213471560301830144119', name: 'Vivek Questionset', category: 'vertical' },
    { id: 'do_2135395279401615361226', name: 'Horizontal Layout Question Set 1', category: 'horizontal' },
    { id: 'do_2135395367682211841241', name: 'Grid Layout Question Set 1', category: 'grid' },
    { id: 'do_213484313936035840138', name: 'Vivek Test questionset', category: 'vertical' },
    { id: 'do_21337242850730803211', name: 'vivek-questionset-progress-bar', category: 'vertical' },
    { id: 'do_213521052524797952167', name: 'Talkback-question set', category: 'vertical' }
  ],
  sa: [
    { id: 'do_213536742733381632187', name: 'Subjective question set 1' },
    { id: 'do_213536749100793856196', name: 'Subjective question set 2' }
  ]
};

export const SampleContentList: any = environment.baseUrl.includes('staging') ? stagingContents : devContents;
