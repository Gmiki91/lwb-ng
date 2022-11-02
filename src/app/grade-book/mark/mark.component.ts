import { OnInit, Component, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/shared/models/student.model';
import { Topic } from 'src/app/shared/models/topic';
import { TopicService } from 'src/app/shared/services/topic.service';
import { MarkTypes } from '../../shared/models/constants';
@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements OnInit {
  @Output() save: EventEmitter<Result | null> = new EventEmitter();
  @Input() set dataInput(param:Result) {
    this.selectedTopics = param.topics || [];
    this.data = param;
  };
  data: Result = {} as Result;
  selectedTopics: string[] = [];
  types = MarkTypes;

  topicList$!: Observable<Topic[]>
  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.topicList$ = this.topicService.getTopics()
  }
  onSave() {
    this.data.deleted = false;
    this.data.topics=this.selectedTopics;
    this.save.emit(this.data);
    this.data = {} as Result;
  }

  onDelete() {
    this.data.deleted = true;
    this.save.emit(this.data);
  }

  selectTopic(topic: Topic) {
    const value = `${topic.lesson} - ${topic.text}`
    if (this.selectedTopics.length===0 || this.selectedTopics.indexOf(value) === -1) {
      this.selectedTopics.push(value);
      this.selectedTopics.sort((a,b)=>{
        const number1 = a.split('-')[0];
        const number2 = b.split('-')[0];
        return +number1-+number2})
    }
  }
  removeTopic(topic: string) {
    const index = this.selectedTopics.indexOf(topic);
    if (index !== -1) {
      this.selectedTopics.splice(index, 1);
    }
  }
}
