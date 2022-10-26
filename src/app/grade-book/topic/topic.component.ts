import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Topic } from 'src/app/shared/models/topic';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent {
  subject = "";
  grade = -1;

  @Input() set info(obj: { subject: string, grade: number }) {
    this.grade = obj.grade;
    this.subject = obj.subject;
  };

  constructor(private topicService: TopicService) { }

  onSave(form: NgForm): void {
    if (form.valid) {
      const { text, lesson, date } = form.controls;
      const topic: Topic = {
        text: text.value,
        lesson: lesson.value,
        date: new Date(date.value).getTime(),
        grade: this.grade,
        subject: this.subject
      }
      this.topicService.addTopic(topic);
    }
  }

}
