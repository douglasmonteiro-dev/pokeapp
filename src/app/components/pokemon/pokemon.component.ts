import { Component, OnInit, Input } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';
import { HttpResponse } from '@angular/common/http';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @Input() name: string;
  @Input() url: string;
  dados: any;
  // tslint:disable-next-line:max-line-length
  img = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCADCAQMDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAAAAIDBAUGAQf/xABREAABAwEDBQwFCQUFBgcAAAACAAEDBAUREhMhIjFBBhQyM0JRUmFxgZGhIyRicrEVNENTY5LB0fAWVIKisiVEZHOTB4PC0uHxFzVFVYWj8v/EABwBAAEFAQEBAAAAAAAAAAAAAAQAAQIDBQYHCP/EAD4RAAEDAgMFBQYDBgYDAAAAAAEAAhEDIQQSMQVBUWHwInGBkaEGEzKxwdEUQuEjMzRygvEVJDVSosJikrL/2gAMAwEAAhEDEQA/AJty6K6IrqPp4awJsd/XD+2lhzdbaIJc1t2m44j9eOsm8nU8FdSgA5MeT5Gl3KwsOOjq6nedXob40Yp9oHsv5xfU7diMEMb3LKM1XydSoYUs0lMdTGGOCImEi6N+q9O2YGXqd7fvA5MfZPWP8zN4qwsk/ka2zo7TD0Et9NVBsufb8HvTFpWPU0NbJDj04icRLsbEL97M/wB102eTHkpCmYDgNLHrn91DrYchJwMAGLSD7N7au5727k9BS5Sya6bBxWRk7ncm/FvBaK0aTf1m0lZGHzsTH3TLTZv9QTb+Jk3YkO+9zdd7dFIPfGbGPkfkoe87N1b7jtkcj8v1CgVNmnPa9o6HJknHtZhP4Ep4U+U3L7n4f3ivcvN2+CvrHpMpKc3+HjL78At8QTIU/wDYm5w/o6enOpLuh/MmVJqEwOH2KKbh4l3H7j9UUZ703AVVT9JUDJJ98nFvwWCqQyeAPs2Iv4tJvJ2W9t6A4NxtlWbHxlQUEHle/mywVfNl66eaPizkfD2X5vK5WYe8nmqcbbK3gAmEK5q6A7JsgDqPnVbwR2xxtnd363fD3XqqKE8nGfTLCPtXa/wV4cDognMLbHVNEy5MOUi6fs9JSq6lOkkyNRx+FiIehfnufruuSJ4Tg0JOHhxYejzX9aRAcI4qTHupvDhuKztNZ3GTcP0mLF0n57uZtjd6eOIIPWajQji0hx8m/WT85v8AirdVc9JNVS5afAAAXoouEw+0TbS5m2LLqYNtFsUxJ6uf7ye+47LCbfq4+sTinhjB5wbZWiNSJBMQBIAg5HUtTNJVygZhzlFAfJH6yT9f9V0lmnJLlqzpcvS8W2v7P/ZXTUsNJGZyaAcIiPWXW78/w2KhtSrqauTI08JgBaI85dV3Jb9PzLIxGFbQPvK13HQce/ruuu52XtWptEHDbOinTHxPOgGpAJ1O86km7iQo9qVOP0MfF4sRcrEXOT7X8m7lGp6Q548twIA4Upau7nfqVrT2UEHzgN8z/UBqH3y2N+s6Yr5XOTkTSRaOjxMHUzcp0DUwz71cR5dfIX4wuhwm1KXZwezLje87+YnWdA93ZP5c5EKpd2vfJ8D20Y0G2TvGThpBLKkgrtGQWgi6eSXTV6W0ikHSp5SknCmTjMFJXUoThxCgoUw4wNMHEaSsDwU0hCElJCEISSXqqELuFenL4wVnZUO+9Ck0LSi0ovtW2j73NzteyehhCePHTw8MsmUXBwm+uJ32M914vsdrlTxSHHIBxngkAsQkGsXWvhcLZjkr6SEPlIBw1lHwWqQ2u3M+bxu6r6XktvuRVEB4jf8AP9fn3pVo0Py7ZIVOPHVUgtilw554ek7dJrnvbnZ+pTbNhO1rNyMmhaNF6Avau0opOvO3g5c67YlQEFTHUxzY4JdLK7djORcz6mNufCXOrWvpPk2tgtKnDAADkKofs3fMX8L3d3YhXOI7PktGnTB/aef3VTYgHvG0rNjDAYXVtKJ8nPfd3ENz96l7laUI6m1abB6CXBUwe5Iz5vK7uUy0qXeNpQWlHwAkwy+5JmLwLCXe6s6SlCCX3L4x9y/ELd17soPfI71dTow4T+X5dfJQ9z0OCzYMp+7xxl2hiZ12sp8nYG9uWFO1N4sw/kptLHk4jD7Qy8Sd/wAU5NHlI8HtMXg7P+CqLrogMhkclmN2smTlgPkU8M0/foxh5msxuHskLStfHUcRT3EXtPyW+L9y1e7OiOrs2uPHgjijYi9phxE7N2u4/dS9zllnQ7mwpuBPVaUvPGz/AIsObtdENqBtKBqgH0TUxMkWF+vJUO6On+VqmOpx+kqpHGDHqipo+FK/a+fsdXdj2SFJTHX72x1YR+qxGOJwBuC13SfW787urgrNpt85bB9GEYjsEBe9hbqvu8GSbVE54pKaMDMPpcGi5N9Wz7Hfa+xr+dlWasgNGivbhw1xqOueuv7LzSmpZspvmQN811RI+9YuFjO98Ur84s993O/UzqLXuEfq0B5Y8XpZ+FlD5h5xv27Xz8y0VsBNSZeGPAdoyi0c8sWqIHbQp4m7Lu5QwoDsnJ01OG+bclHghpNSBtz9K7bsRjXzfr+yy30iOyPH7cyf04lZ+ohOCTBJxgcIej1P1ponVhLZ2Qjy1RMGQ5JBpPK+3Az629rV2qArgZFkKRlNwq+WmOeXHJpyBwR5EfX1l+syeCnyfF6HSLaXU3MykpEhhwOH7P5oX8Oyn23a9dW+VlsDamJrgUGWYNw0A9BHfbeZN1WyU5z+hj0KXlCGji53Im78zd7so0p01J6GkDfM4dHRCLnz6h29am1AnPF6Q8cfRAsIdhFrfu8FHmpAyenkcgH1uhDH/Byn7VnVWkyWC/E8OQ0A8+YC6/A4hrQGV3kNn4WkiT/5Os57jyLZHwufACz08Jz+mcwwbSFsEQ8zC+3uZQSV3VFvuX1SmOswaOVl0Yx58LZm8VWzUhwRY5DA/c1eO3uvXNYrD3zMuOPVvIleu7I2gHMDK3ZdYBu8cJGo/qaw8t5iJDp5IJkDlXRApK60iHZITAwpap9iS1ESmlJTBUSxOkAyJk4egngkBOKWqaS1QcBdBCnITQpe8K9FVlZsdTHLHWWYeOeLSKLDpjz6PKHs8lLpqexLSijCOpms2r/xGnGX8Wa7vTwblLYglx0+DKBpRSxS5i7C2P23L0h1Ruht3r4+ZRfYtE93VkDRUe6CLHZmCjtHlUfIl6432diesZjjqYzkPedpU+jlTHNzYZh5n1Y279iTUZGrqcjbcJ2VavJrAHCBvzkzbfaZaeipTq8gFt4N/BxFVFo5VuZi1G12tn8Nqoe+BB6+49UXSp53SNfLzG4+iWFKElTJUxwnCZl65S63jk2Sjz5r2fpM79iuKOM44sjJwA0R5Wbm62/BcgoggkDJ8ANEecW6PWPVs+EtBudK1abMtygmQhCgrUIQhJJJNgk0JNMEpCE6SExVzhTxY9PGWiIhpOT7GZudPpooAyuP6TDhx9FuZuZIc0xncs/TUE0lT6vgCrziU/Camv4Qhfw5H2l/2S7UagsKyDCMIQx8IpdLKPr0tsj9WrnuZXcmOOLBSAHs49EI267vh8FmpqXLySVNOe+av/3Gr4iBvsh1P8OtXNdmN9EK9vux2Rfrr5kWWRr4Dnk3/ac00IS8HK6U0rbLh1C3k2y9QaykmjiCaSjmpoD4rHfpd761sZ4IbJiOv46ci0rRtAb3J/s4tbv23dqyNSdTa1bJN6zUn0z1i3XdmFkbTeT3LIr0g3XU9dRbmVAJlzJh/u+js/6pS4Tq0tBuVRTqPbZhVZPXnJU72symOpqx5IDiwc976hU+h3F1FXLvm3qw8pyYqctX8X5Mn9xsr0ltWlQHoBUXVcX9J+dy2a829qvaDF4TFHC0RlAg5tSZE2mw4WE816T7O7OpPwwrE3MggW3mxMyRynLyWMq9xk390tifQ4IVANLh7HzXLN1+4u248cjBDWe0MukX3rvivV0LnG+1ONdauG1O8X82wfMrpMLhjgb4Oo6n3GR5Okei8KrLPr6H55SVMIdI4nw+LZlFZ7nXv68GrAyddOHRkP8AqdbeCx1LaFF9RtPI5hbvkGZ3ESIjidV0mx9q4ypjBhsQ4OaWuMxBkFvAxv4BNJLilIVkhdkmnBIdlIQlCkHKOgZDjTrgmiBKCpSCl5f2EJlCeSlkC9fhYI4o990ZnAfBlAnDwd2dnWq3PQnSS+qWqdNAfBGoiwhf4uJdxM6KKituh0/keE8fC3vK0Tl2sL3P4OrKG0bNjl9bsqssoz4RhE4gXa4a+9l6HUfmFl8j0KIYQXW7wR6q+vmkjyNp0YHGfKDTjLtF87efamaayQodCkP1U+FSy6UfaO0fNlJs2SjkpsdAcJh9ld8G1KWgSSLLWDA6CboZkIQoqxCEISSQhCEkkIQhJJCEISSTU0AT/ONOPo7O9tveotsTTQU2OnOmh+3qC0I+xtr9WZTJQOTizwfHzTMVDTRy5bBjn+tl0z7nfV3KQMaqDhNgsn8mhV1OWyNZbc/1tR6GnHsbW7dTNcqfdUdZBEFNVmAByYKeJooR7n0i7Xa5egWlGckf95P2QlaJu8tfgsXa1JQZIwkmsSg9wiqJu982fuRVF8mT11yCzsTQytIG/rx8SVjVwnUypho4/m9Yc0n+Rhbxcr/JREdMiyx4ym6ramo3la1nWjgwBFNk5S9g9F7/ABZejrC1lOFXTHTT8AhwqINLWQcXbdq/6uP4rkfaP2ZdtZzKrKga5oIMjUTI04SV12w/aGngQ6kaZgxAB5QdfBafd3OcG5euOAzA9ARMCwvnMWzO3asJaM1fQxGcFsVYYBxYZat3K/qG78U7bB2rPSnDV19TNS5iLKxxC2Z2fO+Jn2KXuesis3QRgdZ6tZfQiHAU/U3MPWqNn4SjsLBluMLSMxcTlJBENhozASTBgDv0krZrP/xGt7+kL5cobnEzeXQ0kACR8QHK8L0Kgly9FBN0oxPxZnXi9qxf2vaXsVUg/wAzv+K9o9DSU3IhghHsFmZvyXjloTx1dp11TT8TLMZBycTPtXKbCGZmJc0dk5Y8zbviV22yCW7Roibhrp7oF+6YVcYJolZJk4gWiWr0UVOKhLuJPHAmCFNcK0ODl29cXFzGpBylCUhJxoTymhe701Lutofm4VmT6OJjbwd3V5Z1u23BoWnY9Sf2sQ4X8NT+SqaG3LBCT0lm1NN7QTkX/EzrcxUMMfFnN/ryfmu+quiz2r5PwzJvSqG3OfmFCpLUo55cclHU00/SqKZx/mZn+KuGdAoQxIOi0mgjVCEIUVJCEISSQhCEkkIQhJJCEISSQSrqqoh/ean3acXLzEb/ADViolTJRycZWYPcqXD4Oyk1RfoqCtagk/8ARLVr/wDNGQm8Tf8ABVFZTnkvR7koYY+nLPh/FvitMdPY8/GV5n/8hJ/zqltjczZU/pqevwewBZbE/PpFeiWOAMGfX7rOrUnkEiD3R9R9Via8MnJwIQ9mKXGw+bqOrK0aGmpNDfMxydE6bD54lWo5pBFljvaWuumpZPf+6qastWE+Ly2Pp57vBnZXybJj6Afe/wCiAxmHq1RDXx4E+V10OxtpYTCOzVaJcRp2w0eMtv5qt3H2MFuVM9Tachyw08jegz3GV1+fq6l6ToRxdAQ8BZZXcBxVsHt38Y+AitFar4LOqv8AJP8ApdeT+0b6lTaP4RzuywhoHgJMcSbleh4GsK1A4wiHPk6zaTAngBYRZea7sd0h2zLvakP+zgLhfXO233VnWfJ3573UqCzqneQTZH0bxsWLE3N2qMuhxlE4QjDMaWsZIA48zxJ3nwFgAu19mKeEOF99ReHvcAXkEGDE5baBugHibkldyiWzpl0lDB8Lp8oKkLjsmWkNLaQFMOBTZSkHACjnCanJKUKQeQq5CsMKE2RWe9Xo9LUTUkuWpzwSdLCxeF6vrLti1auX/wA4qcp0QgeZ/C65Q7PCHgU8J1k/2VMxfzHfd91X9G9fPJkY8jD9liKrMf4B0B77l6RUI3hfImHY4aOPh95A9Vc0DWlJxlTaU3tHBDC3neXkr2mY44/Sf1YvwZV1BZ55P1s5pvZlJhb/AEw0G81ai2T4tZ7zJW3SaQL/ADXUIQq1chCEJJIQhCSSEIQkkhCEJJITU1PDP84hA/fFi+KarwCSm9JDlvZw4vhn8M6xNXvCSpkCgtuss2fFxUspEF/vM+bv8FaxmbeqK1YU7QD4x87eqsbYoqaPKZTc3ofW08UcrF3M4usnWBZvpMmAQydGWKUH8iJXh1G6qzYsePfkH1oXTN48JU9bbgWloWnTH70U5Dh/hK9vgjKYcOY5FZVdzDqIPMfZUZNk+h/AhSJgpuHTzTe7LFhfudne/wAlHRM2lZ8bkJBx5Tp/wE4/BN1E+T//AC5eNyiPaOf0Z0x++Th+DoOtjaFN2R5Hp8v0WzgtiY/EMFfDtMcYI9YgeJV9/s9H+yas+nWTFr62b8Fc28+CxLRP/Dyf0uvO4N+UMeCkr6yGPE5YYpYybE+d9dy5NalZPTSQ1Ft1mTIXAhOAXxM+Z2vZcDj9hNxG0XYwV2gF0wcwMT/LC9AwhxlPBigMO5xAiW5XCfBxhUMA+rx5+S3wSnBSiDBEANNCbDoj0vNkhPigHVXOG8k+a9U2WS3C02GxaAD4DmAojikEphJtwFD5VpB6iuyQSkvCmyjNNBVgcE0zpbT9NIJcJPJUoB1T+VDpIUZCfMlkC93O0bEpIsEh1lq4OTxMH3GzeTrQWTW189DlqgKOxLNDg6LXk3VfmZuu5edUk+Qlx5EDk5OMcTC/PdqfvWkOzuLrN11eYcoaXFimLu5LfrMvR6lMb/v5BfJNCu4kkfYeJN1pv2mhnk3tZFNNXz9LgRj1uT/kraigqeOr5gOf6qK8Y4/xLtfwWfsaeprqaMLIowsqyg4U53ZSTnw7L/ae9Tmtmjjj9UPBQxFhKqzllD6Me2Qud/ihXtgw0LRp1JGZ5+g8N/iVfIUWmmmkiy1WG9g5MR6Tj7ztt6m81KFUkQiwZuhCEJk6EIQkkhCEJJIQSCdNTHyI+Mw4h5/PWnSVfNaGQkyNXDjx+zicm93lN2Z/ZWN3ST2VXR46eYwMOSdx4ex3z4fdd7uiy1FXkbSi3tJgCc9LJGTiErttF9YG3i21nbOsha1L6WTfYHNg0ilzZeNtjm2qUfaZ+9tSLogTO9ZeLc4tgXHXX6LPwVE1Jp0800P+UTj8FMO1pp/n4Q1ntyjp/fa4vNRp6U49PGE0H1oau/az9TqOjYBusjM5tk9UPTSadOBwydHFjbxzP8UyhcIsmnJDRJKQBeQGi54JEjcv/hxKBLR00/I0+kBYsP67FY4/0GkmCCmn6ByeY/iyy8VRp1zHZM7jv8SD6BdRsrG4jAjOQ8AauYbDkWgtE/zHwVbua3L/ACzTTzSWicJxTPAcYwNs1Z36nZXv/h/R/SV9flPeEW8GZM7lZgs3dJVUxnggq4RnEjLNjHM+d+p1fVu6qxKTQkr4TPow3m/8q4XbVTa1DHuoYRtrEBrGmJGkhs2Mi/BdXgMZQxOGFWtWcbkS57rweBdvEGAvK8kcEslNPx8BPEXa2ZdVhb1ZTWlb01ZQxVEcMotiyos2m2a9mv1O1yilCrcawtqZiMpcASOBOo8DML0n2cxjsRgW+8mW9mTN40N9ZEEnjKZxLmJLKM007IUOIW+IKWkptGM1Nr1KEpxTRQil5RKvUpBUgSFHyCFIQlAT5ivQqWoOkky1PoSBwSwsWHra/U/WpNJPDlctV46mcy+l0g7Sa+836szc6gqTRcZ6OHLT8kTuwD1vfr783OvTSAvj9jjMLQVFfNVxxhV5bIS3ZKjAvSVPM5XcEOps3M21XNj0/wDf684Qjpxw4g0YYG+ribn5y7mvfO1HZQQyST1NRUnvQPnlZnvld/oo9ufa+t25mS7Yt05I4MnCFNGA+q0uyJtkhtqxXcFtTa+a8ZzSey0ddenktBlQN/aPPXXrpxVxadunJXBTU8JnOfFQcF479WJ9hP8AytftfNf2fVerHlDxx044SnDUZtwsLczPm8ti86iy1mxYI8Z2xW6PXEBbPfK/ubtW7sqnye9bNj4izxbKlsOZ87N3XuXa4qqqwNFkThqz3uJPXWp8ldx48l6TjOj0epKZ1BGvD05/QRC5Yupr2v73Yvu9aTCZx7xhk48xOeXw0v5jbwQ0I8PCsEIQoqaEKI02TrZw4fo8WHrHM/kQeKRXxhaVkzhTnxseKIg57rxdu+5ShRLrGFVhauTqfW/mhyPTTif0EzZmf3Cb4tzqRUyZCpjoK8zDGXqdVtv6Lv0u3hN3rJ1lohPTQWrIGOCrHelowdI2bMTcz3Ne3YpENqw72CxLb9NAfFVnsPnjk/X4OiDS666KzhiQZBPd1z9CCp9rzwnKdNX5GmtILuHeMNSzcEmLkFzPrF82dll6iappOMOaaAC5ZYZqY3624L9baJfC7qwOui+QbbMAtGLSo6o9UvMzv1t+r2z4+VpqSpkhkxhOHoyE/g/OyIpNEdeiExNQzm67j1fVcKoPKmcehj9lhYm6x1d2pNE64hEIAklCjTTZOXBJoe3sUlIkH+P2DQ2KY9zewb9dx8rrR2bVosq/thIPOPUgt8HDKd8aqtmAA09OH7WLgd7JEjzPHjkCGpj6Ya/LUnShzvveQwk+qP8AVzqCYnHJe7YD9jRXIYqq6hYtIB4RH2PcWh3Er17ZeEpY2Cx4c8CRmBDo5Gc7eGZr3MO4bkzVR01Xpm54x4Iy6Tddz/mgJ4QiwR00I+6LXeCdM8p84AD9vgv4so8seb0d+bpNnQNXG1i3Kx/Z4X+UkDwXR4PZOGY7NWpdvjY/8gA4j+e64Rg7X5+xBJomXEBnldG1kCAlkkEy5jXMonlTgpBRgmyhT94IJPYqYcQoZxmmnZWBJomTwrBUURCkZMEJ4U84W8TgHyOQfCwa7kjCuL02m9rmyCvkSvSqU6ha5sHh91Yy1uUwZQAyEWjBS8JhfaRc/Xz9iTTPk8pX1fpjxeiE9LKnzvzi23nzNzqAnZ5svJ9mA4RHotzKWXgq88mSr6w33pFPb1X6afE8dKJ6TyzPrLuWvlM7GsSlo4z/ALRq9HF9oWeSR+pr3fwWFo7U9LBNUYMnZ8foINhHsvbbn0nfqTtoWrNV5evnM8ZxtSQY9d13pC7bv61Q+m5xv1wRtKu2my2vUnv3DwWtgMJKazaOP++yNJh2jTA2jf2sI/edItK1D/a2eGn+ipcPe+zxIPBR9yNXv61qq0qgMGi1NAOyMGbEXczM33lQWRVHXbrcf71UN9xjY/8AhZVin2jO4Ih1bstg6n0H63W23U1Z0kfozwejYv8A7om/NT6uo9Wy0fIqGj8JMDrH7r7RCrln3ufFZODvaYr/AOhWI1WUsC3z/d62Qh7pGP8ANV+77I64K7381HAaR8pXaavP9oIDk5eR8JI7n/nAFJsyr3h8pUcnAoqjKf7g3vbwxP4LK21PkK7HH0Zox7Y53MPgPirior4ZN0lJU/3Stjekn5s7MQeRh5qZZI63dFVMrQdbg/P7WVXasIUG6S0aCTQobQ0uoHfSAu4r27HdUwsZxyUFQHrdOT5Ltv04/i7dfarjdHHl7JA5NOqs2R6KfnIL3wF5eao6yTLxwVn0+aOXtZtEu9m8WdEU7jrzQNYw48Pod3gfWVZ0dSFs2b8m1Hz6nHFRy9Lnid+zV2MqSonmn+cGZmA4dPXc2pndIOQ5JMf0mLFoaOdLqZjnkkmk4Z8L2n2v2vrVgbBsqH1M4vqPVNIQuEo1KmQSp4eh70xpOnPl187JJOmwnCT9aSWahVEISOxx6GL7pfk6w8bjquHM0rjgd/cfpu77Lt9j7Ew2OaW15a8fmGoPBwt35hHG4kp+Z+RIGWDz7udMO2Ui9H6ePoHwx70gTO/BJp8/P386j1DG7uYY7unt8dqyq20mvl8SN43jzmRyM+C6rCeztSiW0g6CLg/lPMRBa7m0sdvOaUFA0jvvfO+0D0SFME3OkU8NZXyznSQmYU44pS/Buv8AJJeUpHcuH2rLxdDI0VC3LO6dJuJGrSRcDeNIhdTsnHirVfhhVzlvnzg6OANpgEb5mUp2TZACcxpN6CkFdCJTJQpoozUtJdOArA8qETJKmOybIE+VWB6jZQ0ZROlCmihNPdTBaV3GHTQm8maE8lPA4repaQ2Zr9qSusp4wmoGgabuA8N+nyG6fn2tszLQc55+LfvJ1m/ib83Oi+RSECSFs4TGtxILm/CN/PrqFzO0dluwRax3xOvHAHSd4J4HQRvQnqmTKYAj4uIcPe+cn8fgyZQjdVlaWVo9fNQxQQ0h4PQuJdslzl34WFvFSdxLB+0EBycCKM5PAX/NUZOnKeeaDKb3Mwxi8ZYOUz62UCyWkDerGVYeHHQJRVByZfKfSyNIX83/ADLRU1XlLA3VBj4czF3Ebs6yyE7mZkqdUsk9/rP3Vpac2Xpoz+0Yvvxg7+Yuoh1ZyU2R6GDCXRws7N5O3gyjk64nDQBCg55cSeKvayvylpb5k4i0Kdhn7bsJP3GN/cqPEjEuJABqdzy8yUKPV1cMHGaZnwYg0nLsZPk6zNojU2Hukgtikx5MybEHCYTZru5nbMokmoHNp3cN0xeJF9yJw1Fgex1b4T474PX3WppbJt6u046OGjD/ABB6Xg2pOVO523aWLHjpqnDyR0X7lqtzO6Ol3QRzvSAYPEQ4hO6/O2vN13t3LP2tblr0m7Decc2OApI8lBkm0wLMWldfe2d9a83ZtvbmKxr8OWspuYMxa4bhBibmYMzIHMLuhs3AUKALJLXGJHO0qghqseU0DCQSwyxFrElGsmea3a2SmoMjTHiIfWC4y53a9h2vmvVlbjHPuttU6AAyEQtl5TLDGLtrxP5dyh0lgVlhW1Q23ObbxyjEQDfoM+srnztrW+MTSdRLnENfUaC1pvDy2Y8dINzwMpGo9uUs1aSC4SCWzF+Y1nuMghcqNz1pHukjsqOpM8kOUllDRAWu+CrrZjtKkfeGR9eygjgz6bX53G7bcvW7Qmhs2mqrSjgOYzFuK0iO5tFuxY7cbVzWrukrqyrMCrgp/QBsiz3XMz93isTAbYqYui/GVqTfd0WjcAS+3AEBt7giI0Eo59SthnGjTqmaki5JgGdJOo1EGZ1sq+Gzt0cFktTx0Zw0vCKKImYz6ye+/VsVHZ1PNXW3HZsMLRYx5d4587vfd2ea2NkWdatm46ySGaa2Ki8RHHiAec5Hvu7G/TQNyNJU0u7o/lc/WjEyD2ids93detE42nWZiarzTcWNc5uWe06LnLmcHAf7rE33CwlCviMEWUsOS3MQCYuBwDoBE/7dPHVqDclV/LcdDPUgGOEpsYBibM7Nt7VSVlIcFbPTZzyMhDmzfrWvZhgiOt34GnJk3j88/my81t2mCe0rRr8tkaHfLQ4sOeSTMzsN+a5trvzLC2XtF21i6g9obla3RoHbzRuEyQTblO4rboY+ps3ENxFV73gl0jMTbLwJixi9lmLJhqbRkqwp6czkpyccIM15M12e7vSqkJqSXBUAUJlyDHOtfFYkO5u1oLVjm3yAE2XHFxeNna/m/wCyuN2Fl7+t+wzwejOTCXY2k/k3mj6mI2ecRSptb+yc0nOJBDmtkiHWuIOg+IRKan7RbVp+8qZgSHWaQIhxtdsG3fuK80xbMC7jBa3/AGgRUcdox01HCEJhHilMR59TfisoVMhHhhp06tOe2JgxIuQLjjE7rELudh7Sq4+m91ZoGUxImDAEm+kExqbhJSXXDhPoJvEaqDlvATonEJvKIT5k8FbVnReubf1nSgJ9qOovj/L0z2jqeHG/LQHjJ3NjzTFNFQ/jsQIY34Rx4W17WpGoADYu8E4I5m1LqSxM+e/MlDqW3gKzXODGfA0WHEDf/UbDkCFym2cK+nSNWp+9eQCTuLhIb3MbLjH5nB25CEtIZa34gmm6DckDz4esLnDgAKzMzey1pcfACAf+IPMoQhKFHPrBgPj6XWPQwjqpHCRPLMYHXNJQhCd1UNaHHl6mFFmHc95YNQD6CfohCEKFWuGtcRu+kfdX4bBmo9gdo6PIzf0QhcHUiQsnqQ+MxjKNMVpt0UZsrZr8TXOGcIP1Fo+Y74QmpBCeLI1AY/ZNO4k3OhNoYw02fiKF4iRxB6PqtbYezG1qxwOLsHTlPBwsfOx5jLulUW5iv/Zjd1vaTQpKjwwE/wCBXea33+0CtOyaIK+kpg32YvDl9Zxjr0et15vu4pspRBXx8fRFi94HzE34+K1FVujoLW3ARhV1Ib+wthDOTkQ6n72uXP43Ctx+Jwm0aTC8Zgx4gm24ujgNTobblu1aVTAe9wtYhpjMDunl46cL8FN3FUNNbu4GSmx6dRI5SlysV94391yk2pQfI1gVW/686yqqI2pIBPrfMzfn1LAWTRWrZMuWsGvyMEo4skd+jfnua7W3ayftWltSuqaWpkr8tOBEUuVvu1ZmFs92fOovwzXY57nYoCi5+YtLe0DaRMWFokG4GivGzMZ7gBtAlwEAyIIO+J5zcWWw3Uboa/cvLZ0UYZaAaVhliw4tVzO97Z2TMNq2VukkgrLIrAs21Q4OO64udr9T9jqikevq6jLWnWb5kAcI6N2FQK2w6eeXLR+hm6UWji7W1OhaVLA0gxr7VADNRgsSSZDmuADmxrIk6cFo/wCA46rSLxYz8Do0ERDgbFae2t1W6GgqZKP1PHFw5QHg5r787/gq3cButoI6mqrLaqT39UCOEuG4je+bnbZsVZQwVYMe+zCaTkkF+ptV9+pdmp4pG9JCB+8KsqVcDSZUwgpjI8NBcwBhOhOoOp3aAIih7M4jEUadZzy2qC6zu0NSBoRu36q2sbdRNJUhRxnoHaOLF0RLZ4uzrR2PFZtXZB2Ja5hDPTyHokWFyvJ3Y2d9evyXm89m+sx1NIe9pw9nM75s+vXmUiomtKvMAtKYKkB5eJ8fwv8ANE4pmzsY0Oov9zo4xOYObMEHQ6kG41BBsso7A2phquQs943QGREGJkTI46Hfqt9vKzcnHYNg6eORpqyXHiwgztfeXO91zMy0lkTBV0O+T+immwl0WYiH4MvFrLtC1dzb1dRSGBgV5lynwbGudnWvsjdRR/sSdNBN68ePR98n26tqztpbDq4yg38K81QXt7Vy6XA53PtYWaOAA7yRnF+zaxZimZDBgWggHsht77+8qotWs39a9VU/WyFh7GzN8PNRiVdEcx1M4SQ4QAtAsXDb8E/eajiqrTUOT4RYdwED0AXqGx8J+FwdOkdQL/zEy71JUlIdkzlTXcv7KpDgVqZSu5EOihGWBClIT9palcN7ttyH7r9aNb7EHSrCkxwGrrdw3+endPFcvicMa9Vhd8Lbxxdu8Br3xwuasycTTZtV/ayUjaW1TQafdtgkjyA7I8Dc8SsvEbAbiqjTWdLWg+LnHtk94sBuBPJLxZ2QOpNs1ycHilr7MxRdUo0zr8R8SA0eV+4rn9uYHLQxVZthGUcwJc4+cN/pQgS1X/rOhyvbMks+bs1K7H7UAqxuDTP9RH0MIfZGwy7DzFzUaBO8UwQPMiUpdfjfvJBZsn1j+CL2vZPX2r/l6Zdx+RCWC2A38bWazSJ/9g5KQ64T/ruXS1Zkbj68OfRnn4nMPq1ZexsIH06OKjSx7m5HfR48SgVyTikm/wAtaWSBoYv8bhn0DqG28NPSfRbOM2UdlY6ljGnsudfkXEAnuzZT5pnF6JD54vcSmzv1Ok3vcszC4ssblqGWkQePhz0IneCN639obK948VKAAe1wcJ07jyPaaY3EHco0sQSRGMnBIcJKDQ2XR0MUYQQ8Dg4s7+LqzcNebuXCBZLatakCxjiAeB1XSuoUqrg97QSNJAMJONcxrhMuOyg17giQAu3ribdkKQqcVKEokh2RjXMorA8FSAKSUYJsoU9jBdUoBUgSFDeE1CKhijkebIiJ9LCrYkhTYXMnISEnsZVj3jQY4hQCSHZT3AE2UAKvIUQKgUEkh2Us4E0cJpQVcHAphCXchOpytchCEAsEIQhCSQRsSh4z9dSELW2f++b3j5Fc9tr+Ff3PXZdSQX0fehCqxn72p3D/AKojA/uKP8zv+yU3I/WxI+jQhRxf7in3u+ibZv8AFVu5nyKeL6TvSW+j/Wx0IW3if4nri1c1gf4PwH/y5IFdFCEDsX+JZ4rd9qv9NqeHzXFwkIQA0XQfmHXBcSSQhOrFxNGhCrfoptTabdCFSrQuOkEhCkphIJJdCFIKYTsaCQhEN0Ud6SkEhCmpBcdJdCE6kEIQhJOv/9k=';


  constructor(private pokeapi: PokeapiService) {

  }

  ngOnInit() {
    this.consultar(this.url);
  }
  consultar (url) {
    this.pokeapi.consulta(url)
    .subscribe((dados: HttpResponse<any>) => {
      const response = dados.body;
      this.dados = response;
      this.img = response.sprites.front_default;
    });
  }

}
