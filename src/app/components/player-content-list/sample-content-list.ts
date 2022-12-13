import { environment } from "../../../environments/environment";

const devContents = {
  mcq: [
    { id: 'do_21368754222912307211', name: 'MCQ Question Set 1', category: 'vertical' },
    { id: 'do_213687603848978432126', name: 'MCQ Question Set 2', category: 'vertical' },
    { id: 'do_213687561852166144116', name: 'Horizontal Layout QuestionSet 1', category: 'horizontal' },
    { id: 'do_213687570690523136121', name: 'Grid layout QuestionSet 1', category: 'grid' },
    { id: 'do_213687609530638336142', name: 'Javascript MCQ with solutions', category: 'solutions' }
  ],
  sa: [
    { id: 'do_213687555691986944110', name: 'Subjective question set 1' },
    { id: 'do_213687607599996928135', name: 'Subjective question set 2' }
  ]
}

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
