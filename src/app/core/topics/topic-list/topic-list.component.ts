import { OnInit, Component, Input } from '@angular/core';
import { format } from 'date-fns';
import { Observable,tap } from 'rxjs';
import { Topic } from '../../../shared/models/topic';
import { TopicService } from '../../../shared/services/topic.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  topicList$!: Observable<Topic[]>
  isLoading=true;
  @Input() set subjectChanged(value:string){
    this.isLoading=true;
  }
  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.topicList$ = this.topicService.getTopics().pipe(tap(() => this.isLoading = false));
  }
  formatDate(date: number): string {
    return format(new Date(date), 'yyyy/MM/dd');
  }
  onDelete(topic: Topic): void {
      this.topicService.deleteTopic(topic);
  
  }
}
